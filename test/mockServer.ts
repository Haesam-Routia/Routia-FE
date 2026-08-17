// 플로우 테스트용 mock 백엔드.
// API SPEC 문서의 엔드포인트/봉투/오류코드/단계순서 규칙을 최대한 그대로 재현한다.
// 실제 서버가 아니므로 인메모리 상태만 사용한다.
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import type { AddressInfo } from "node:net";

type User = {
  id: number;
  email: string;
  password: string;
  name: string;
  onboarding: {
    lastCompletedStep: number; // -1: 미시작, 0: step0완료, ...
    status: "NOT_STARTED" | "IN_PROGRESS" | "GENERATING" | "COMPLETED" | "FAILED";
    step1CompletedAt: string | null;
    step2CompletedAt: string | null;
    step3CompletedAt: string | null;
    completedAt: string | null;
  };
  profile: Record<string, unknown>;
  needs: Record<string, unknown>;
  notification: { notificationEnabled: boolean; notificationTime: string | null };
  items: { itemId: number; timeSlot: string; title: string; completed: boolean }[];
};

const users = new Map<string, User>(); // email -> user
const tokens = new Map<string, number>(); // token -> userId
const verifications = new Map<string, { code: string; verified: boolean }>();
let userSeq = 0;
let itemSeq = 100;

const NOW = "2026-08-18T00:00:00Z";

function newProgress(u: User) {
  return {
    status: u.onboarding.status,
    lastCompletedStep: Math.max(u.onboarding.lastCompletedStep, 0),
    step1CompletedAt: u.onboarding.step1CompletedAt,
    step2CompletedAt: u.onboarding.step2CompletedAt,
    step3CompletedAt: u.onboarding.step3CompletedAt,
    completedAt: u.onboarding.completedAt,
  };
}

// ---- 응답 헬퍼 (봉투 2종 + 오류 2종) --------------------------------------
function sendRaw(res: ServerResponse, status: number, body?: unknown) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(body === undefined ? "" : JSON.stringify(body));
}
// {success, data, message} 봉투 (onboarding/profile/needs)
function sendEnvelope(res: ServerResponse, data: unknown) {
  sendRaw(res, 200, { success: true, data, message: "요청이 성공했습니다." });
}
// {data, message, success} 봉투 (home/routines/weather/achievements)
function sendDataFirst(res: ServerResponse, data: unknown) {
  sendRaw(res, 200, { data, message: "요청이 성공했습니다.", success: true });
}
// {code, message, fieldErrors} 오류 (auth/onboarding/profile)
function sendCodeError(res: ServerResponse, status: number, code: string, message: string) {
  sendRaw(res, status, { code, message, fieldErrors: [] });
}
// {data:null, error:{code,message}} 오류 (home 계열)
function sendNestedError(res: ServerResponse, status: number, code: string, message: string) {
  sendRaw(res, status, { data: null, error: { code, message } });
}

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (c) => (data += c));
    req.on("end", () => resolve(data));
  });
}

// FormData(text 필드만) 최소 파서: name="userName" 값을 추출
function parseMultipartField(body: string, field: string): string | null {
  const marker = `name="${field}"`;
  const idx = body.indexOf(marker);
  if (idx === -1) return null;
  const afterHeaders = body.indexOf("\r\n\r\n", idx);
  if (afterHeaders === -1) return null;
  const start = afterHeaders + 4;
  const end = body.indexOf("\r\n--", start);
  return body.slice(start, end === -1 ? undefined : end);
}

function authUser(req: IncomingMessage): User | null {
  const h = req.headers["authorization"];
  if (!h || !h.startsWith("Bearer ")) return null;
  const uid = tokens.get(h.slice(7));
  if (uid === undefined) return null;
  for (const u of users.values()) if (u.id === uid) return u;
  return null;
}

function generateRoutineItems(): User["items"] {
  const defs: [string, string][] = [
    ["MORNING", "림프 마사지 5분하기"],
    ["MORNING", "수분 크림과 자외선 차단제 바르기"],
    ["MORNING", "단백질 위주의 아침식사"],
    ["MORNING", "물 한 컵 마시기"],
    ["AFTERNOON", "자외선 차단제 덧바르기"],
    ["EVENING", "근력 운동 20분하기"],
    ["BEFORE_SLEEP", "취침 전 스크린 오프하기"],
  ];
  return defs.map(([timeSlot, title]) => ({
    itemId: ++itemSeq,
    timeSlot,
    title,
    completed: false,
  }));
}

function handle(req: IncomingMessage, res: ServerResponse, body: string) {
  const method = req.method ?? "GET";
  const url = new URL(req.url ?? "/", "http://mock");
  const path = url.pathname;
  const json = () => {
    try {
      return JSON.parse(body || "{}") as Record<string, unknown>;
    } catch {
      return {} as Record<string, unknown>;
    }
  };

  // ---- Auth ----
  if (path === "/api/v1/auth/email/check-duplicate" && method === "GET") {
    const email = url.searchParams.get("email") ?? "";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      return sendCodeError(res, 400, "INVALID_EMAIL_FORMAT", "이메일 형식이 올바르지 않습니다.");
    const dup = users.has(email);
    return sendRaw(res, 200, { duplicated: dup, available: !dup });
  }
  if (path === "/api/v1/auth/email/verification-code" && method === "POST") {
    const email = String(json().email ?? "");
    if (!email) return sendCodeError(res, 400, "INVALID_REQUEST", "email 누락");
    verifications.set(email, { code: "123456", verified: false });
    return sendRaw(res, 200);
  }
  if (path === "/api/v1/auth/email/verify" && method === "POST") {
    const { email, code } = json();
    const rec = verifications.get(String(email));
    if (!rec) return sendCodeError(res, 400, "EMAIL_VERIFICATION_NOT_FOUND", "발급된 인증정보 없음");
    if (rec.code !== String(code))
      return sendCodeError(res, 400, "EMAIL_VERIFICATION_CODE_MISMATCH", "인증번호가 올바르지 않습니다.");
    rec.verified = true;
    return sendRaw(res, 200);
  }
  if (path === "/api/v1/auth/signup" && method === "POST") {
    const { email, password, passwordConfirm, name } = json();
    if (!email || !password || !name) return sendCodeError(res, 400, "INVALID_REQUEST", "필수값 누락");
    if (password !== passwordConfirm)
      return sendCodeError(res, 400, "PASSWORD_CONFIRMATION_MISMATCH", "비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    const rec = verifications.get(String(email));
    if (!rec || !rec.verified)
      return sendCodeError(res, 400, "EMAIL_NOT_VERIFIED", "이메일 인증 미완료");
    if (users.has(String(email)))
      return sendCodeError(res, 409, "EMAIL_ALREADY_EXISTS", "이미 가입된 이메일");
    users.set(String(email), {
      id: ++userSeq,
      email: String(email),
      password: String(password),
      name: String(name),
      onboarding: {
        lastCompletedStep: -1,
        status: "NOT_STARTED",
        step1CompletedAt: null,
        step2CompletedAt: null,
        step3CompletedAt: null,
        completedAt: null,
      },
      profile: { userName: String(name) },
      needs: {},
      notification: { notificationEnabled: false, notificationTime: null },
      items: [],
    });
    return sendRaw(res, 201);
  }
  if (path === "/api/v1/auth/login" && method === "POST") {
    const { email, password } = json();
    const u = users.get(String(email));
    if (!u || u.password !== String(password))
      return sendCodeError(res, 401, "INVALID_CREDENTIALS", "이메일 또는 비밀번호가 올바르지 않습니다.");
    // 실서버와 동일하게 sub 클레임에 userId 를 담은 JWT 형식 토큰 발급
    const b64url = (o: unknown) =>
      Buffer.from(JSON.stringify(o)).toString("base64url");
    const token = `${b64url({ alg: "HS256", typ: "JWT" })}.${b64url({ sub: String(u.id) })}.sig`;
    tokens.set(token, u.id);
    return sendRaw(res, 200, { accessToken: token, tokenType: "Bearer" });
  }

  // ---- 이하 인증 필요 ----
  const u = authUser(req);
  const needsAuth = path.startsWith("/api/v1/onboarding") ||
    path.startsWith("/api/v1/home") ||
    path.startsWith("/api/v1/routines") ||
    path.startsWith("/api/v1/weather") ||
    path.startsWith("/api/v1/users") ||
    path.startsWith("/api/v1/achievements");
  if (needsAuth && !u) return sendRaw(res, 401);

  // ---- Onboarding ----
  if (path === "/api/v1/onboarding/progress" && method === "GET") {
    return sendEnvelope(res, newProgress(u!));
  }
  if (path === "/api/v1/onboarding/step0" && method === "POST") {
    const userName = parseMultipartField(body, "userName");
    if (!userName) return sendCodeError(res, 400, "INVALID_REQUEST", "userName 누락");
    u!.onboarding.status = "IN_PROGRESS";
    if (u!.onboarding.lastCompletedStep < 0) u!.onboarding.lastCompletedStep = 0;
    u!.profile.userName = userName;
    return sendEnvelope(res, newProgress(u!));
  }
  if (path === "/api/v1/onboarding/step1" && method === "POST") {
    if (u!.onboarding.lastCompletedStep < 0)
      return sendCodeError(res, 409, "ONBOARDING_STEP_ORDER_INVALID", "Step0 미완료");
    const b = json();
    if (typeof b.height !== "number" || typeof b.longitude !== "number")
      return sendCodeError(res, 400, "INVALID_REQUEST", "필수값 오류");
    Object.assign(u!.profile, b);
    u!.onboarding.lastCompletedStep = 1;
    u!.onboarding.step1CompletedAt = NOW;
    return sendEnvelope(res, newProgress(u!));
  }
  if (path === "/api/v1/onboarding/step2" && method === "POST") {
    if (u!.onboarding.lastCompletedStep < 1)
      return sendCodeError(res, 409, "ONBOARDING_STEP_ORDER_INVALID", "Step1 미완료");
    const b = json();
    if (!Array.isArray(b.bodyGoals) || b.bodyGoals.length < 1)
      return sendCodeError(res, 400, "INVALID_REQUEST", "bodyGoals 최소 1개");
    Object.assign(u!.needs, b);
    u!.onboarding.lastCompletedStep = 2;
    u!.onboarding.step2CompletedAt = NOW;
    return sendEnvelope(res, newProgress(u!));
  }
  if (path === "/api/v1/onboarding/step3" && method === "POST") {
    if (u!.onboarding.lastCompletedStep < 2)
      return sendCodeError(res, 409, "ONBOARDING_STEP_ORDER_INVALID", "Step2 미완료");
    const b = json();
    Object.assign(u!.needs, b);
    u!.onboarding.lastCompletedStep = 3;
    u!.onboarding.step3CompletedAt = NOW;
    return sendEnvelope(res, newProgress(u!));
  }
  if (path === "/api/v1/onboarding/complete" && method === "POST") {
    if (u!.onboarding.lastCompletedStep < 3)
      return sendCodeError(res, 409, "ONBOARDING_STEP_ORDER_INVALID", "Step1~3 미완료");
    u!.onboarding.status = "COMPLETED";
    u!.onboarding.completedAt = NOW;
    if (u!.items.length === 0) u!.items = generateRoutineItems();
    // 예시처럼 일부는 미리 완료 처리
    u!.items[0].completed = true;
    u!.items[1].completed = true;
    return sendEnvelope(res, {
      ...newProgress(u!),
      routine: {
        routineId: 21,
        directionText: "가볍게 시작해 꾸준히 이어가는 아침 루틴입니다.",
        homeComment: "기대 효과: 피부 톤 개선 · 붓기 완화",
        items: u!.items.map((it) => ({
          timeSlot: it.timeSlot,
          category: "SKIN",
          title: it.title,
          detail: "부드럽게 진행하세요.",
          effectCode: "CLEAN",
          expectedEffect: "피부 청결",
        })),
      },
    });
  }

  // ---- Home / Routines / Weather ----
  if (path === "/api/v1/home" && method === "GET") {
    const items = u!.items;
    const done = items.filter((i) => i.completed).length;
    const total = items.length;
    return sendDataFirst(res, {
      userName: u!.profile.userName ?? u!.name,
      date: "2026-08-18",
      directionText: "오늘은 자외선이 강한 맑은 날씨라 아침 보습과 자외선 차단에 신경 쓰는 것이 좋아요.",
      homeComment: "기대 효과: 피부 톤 개선 · 붓기 완화",
      progressPercent: total ? Math.round((done / total) * 100) : 0,
      completedCount: done,
      totalCount: total,
      todayTasks: items.slice(0, 3).map((i) => ({
        itemId: i.itemId,
        title: i.title,
        completed: i.completed,
      })),
    });
  }
  if (path === "/api/v1/routines/today" && method === "GET") {
    const items = u!.items;
    return sendDataFirst(res, {
      date: "2026-08-18",
      completedCount: items.filter((i) => i.completed).length,
      totalCount: items.length,
      items: items.map((i) => ({
        itemId: i.itemId,
        timeSlot: i.timeSlot,
        title: i.title,
        completed: i.completed,
      })),
    });
  }
  const toggleMatch = /^\/api\/v1\/routines\/today\/items\/(\d+)$/.exec(path);
  if (toggleMatch && method === "PATCH") {
    const id = Number(toggleMatch[1]);
    const item = u!.items.find((i) => i.itemId === id);
    if (!item) return sendNestedError(res, 404, "C404", "정보를 찾을 수 없습니다.");
    item.completed = !item.completed;
    return sendDataFirst(res, { itemId: item.itemId, completed: item.completed });
  }
  if (path === "/api/v1/weather/today" && method === "GET") {
    return sendDataFirst(res, {
      regionSido: u!.profile.regionSido ?? "서울특별시",
      regionSigungu: u!.profile.regionSigungu ?? "강남구",
      temperature: 28.1,
      feelsLike: 32.1,
      weatherDescription: "구름 조금",
      temperatureTip: "수분 보충에 신경쓰세요!",
      uvIndex: 6.5,
      uvLevel: "높음",
      uvTip: "자외선 차단제를 꼭 발라주세요!",
    });
  }

  // ---- Profile / Needs ----
  const profileMatch = /^\/api\/v1\/users\/(\d+)\/profile$/.exec(path);
  if (profileMatch) {
    if (Number(profileMatch[1]) !== u!.id)
      return sendCodeError(res, 403, "USER_DATA_ACCESS_DENIED", "다른 사용자의 정보에 접근할 수 없습니다.");
    if (method === "PATCH") Object.assign(u!.profile, json());
    const p = u!.profile;
    return sendEnvelope(res, {
      userName: p.userName ?? u!.name,
      height: p.height ?? null,
      weight: p.weight ?? null,
      gender: p.gender ?? null,
      ageGroup: p.ageGroup ?? null,
      profileImage: p.profileImage ?? null,
      regionSido: p.regionSido ?? null,
      regionSigungu: p.regionSigungu ?? null,
      latitude: p.latitude ?? null,
      longitude: p.longitude ?? null,
      locationSource: p.locationSource ?? "MANUAL",
      locationUpdatedAt: NOW,
    });
  }
  const needsMatch = /^\/api\/v1\/users\/(\d+)\/needs$/.exec(path);
  if (needsMatch) {
    if (Number(needsMatch[1]) !== u!.id)
      return sendCodeError(res, 403, "USER_DATA_ACCESS_DENIED", "다른 사용자의 정보에 접근할 수 없습니다.");
    if (method === "PATCH") Object.assign(u!.needs, json());
    const n = u!.needs as Record<string, unknown>;
    const goals = (n.bodyGoals as unknown[]) ?? [];
    return sendEnvelope(res, {
      bodyGoal: goals[0] ?? null,
      bodyGoals: goals,
      bodyConcerns: n.bodyConcerns ?? [],
      skinType: n.skinType ?? null,
      skinConcerns: n.skinConcerns ?? [],
      ownedTools: n.ownedTools ?? [],
      routineTimePreference: n.routineTimePreference ?? null,
      routineDifficulty: n.routineDifficulty ?? null,
    });
  }

  // ---- Notification settings ----
  const notiMatch = /^\/api\/v1\/users\/(\d+)\/notification-settings$/.exec(path);
  if (notiMatch) {
    if (Number(notiMatch[1]) !== u!.id)
      return sendCodeError(res, 403, "USER_DATA_ACCESS_DENIED", "다른 사용자의 정보에 접근할 수 없습니다.");
    if (method === "PATCH") {
      const b = json();
      if (b.notificationEnabled === true && !b.notificationTime)
        return sendCodeError(res, 400, "INVALID_REQUEST", "알림 ON 시 notificationTime 필수");
      u!.notification = {
        notificationEnabled: Boolean(b.notificationEnabled),
        notificationTime: b.notificationEnabled ? String(b.notificationTime) : null,
      };
    }
    return sendEnvelope(res, u!.notification);
  }

  // ---- Achievements ----
  if (path === "/api/v1/achievements/summary" && method === "GET") {
    return sendDataFirst(res, {
      weeklyPerformanceRate: 71,
      previousWeekDiff: 21,
      avgCompletedCount: 4.4,
      streakDays: 7,
    });
  }
  if (path === "/api/v1/achievements/history" && method === "GET") {
    return sendDataFirst(res, {
      weeks: [
        { weekStart: "2026-08-03", weekEnd: "2026-08-09", performanceRate: 50, completedCount: 21, totalCount: 42 },
        { weekStart: "2026-07-27", weekEnd: "2026-08-02", performanceRate: 42, completedCount: 5, totalCount: 12 },
        { weekStart: "2026-07-20", weekEnd: "2026-07-26", performanceRate: 0, completedCount: 0, totalCount: 0 },
      ],
    });
  }
  if (path === "/api/v1/achievements/weekly-trend" && method === "GET") {
    return sendDataFirst(res, {
      days: [
        { date: "2026-08-17", completedCount: 4, totalCount: 7 },
        { date: "2026-08-18", completedCount: 2, totalCount: 7 },
      ],
    });
  }

  return sendNestedError(res, 404, "C404", `no route: ${method} ${path}`);
}

export function startMockServer(): Promise<{ baseUrl: string; close: () => Promise<void> }> {
  const server = createServer((req, res) => {
    readBody(req).then((body) => {
      try {
        handle(req, res, body);
      } catch (e) {
        sendCodeError(res, 500, "INTERNAL", (e as Error).message);
      }
    });
  });
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address() as AddressInfo;
      resolve({
        baseUrl: `http://127.0.0.1:${port}`,
        close: () => new Promise<void>((r) => server.close(() => r())),
      });
    });
  });
}
