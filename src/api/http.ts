// 공통 HTTP 클라이언트.
// - baseURL: Vite 환경변수(VITE_API_BASE_URL) → 전역 오버라이드 → "" 순으로 결정.
//   ("" 이면 상대경로 요청 → Vite dev proxy / 동일 오리진 사용)
// - JWT: 로그인 성공 시 저장된 accessToken 을 Authorization 헤더에 자동 첨부.
// - 응답 봉투 2종을 모두 처리:
//     성공  {success, data, message}  또는  raw 바디(로그인 등)
//     실패  {code, message, fieldErrors}  또는  {data:null, error:{code, message}}
//
// 브라우저(Vite)와 Node(플로우 테스트) 양쪽에서 동일하게 동작하도록
// import.meta / localStorage 접근은 모두 방어적으로 감쌌다.

type FieldError = { field: string; message: string };

/** 서버가 내려준 오류를 정규화한 예외. UI/테스트에서 err.code 로 분기 가능. */
export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly fieldErrors: FieldError[];
  constructor(status: number, code: string, message: string, fieldErrors: FieldError[] = []) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.fieldErrors = fieldErrors;
  }
}

// ---- 설정 (baseURL / 토큰) --------------------------------------------------

// vite.config 의 define 으로 빌드 시 주입되는 상수. (미주입 환경에선 undefined)
declare const __ROUTIA_API_BASE__: string | undefined;

function readEnvBaseUrl(): string {
  // 1) vite define 로 심은 상수 (import.meta.env 가 주입 안 되는 환경 대비)
  //    typeof 는 미선언 식별자에도 안전(ReferenceError 없이 "undefined").
  if (typeof __ROUTIA_API_BASE__ === "string" && __ROUTIA_API_BASE__) {
    return __ROUTIA_API_BASE__;
  }
  // 2) 표준 Vite 환경변수
  try {
    const env = (import.meta as unknown as { env?: Record<string, string> }).env;
    if (env && typeof env.VITE_API_BASE_URL === "string") return env.VITE_API_BASE_URL;
  } catch {
    /* Node 환경: 무시 */
  }
  return "";
}

let baseUrl = readEnvBaseUrl();
/** 테스트나 런타임에서 baseURL 을 강제로 바꾼다. (mock 서버 주소 주입 등) */
export function setApiBaseUrl(url: string): void {
  baseUrl = url;
}
export function getApiBaseUrl(): string {
  return baseUrl;
}

const TOKEN_KEY = "routia.accessToken";
let memoryToken: string | null = null; // localStorage 없는 환경(Node) 대비

export function setAccessToken(token: string | null): void {
  memoryToken = token;
  try {
    if (typeof localStorage === "undefined") return;
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* 무시 */
  }
}

export function getAccessToken(): string | null {
  if (memoryToken) return memoryToken;
  try {
    if (typeof localStorage === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function clearAccessToken(): void {
  setAccessToken(null);
}

/** base64url 문자열을 디코드. (브라우저 atob / Node atob 모두 지원) */
function base64UrlDecode(seg: string): string {
  const b64 = seg.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4 ? "=".repeat(4 - (b64.length % 4)) : "";
  try {
    // atob 는 브라우저와 Node 16+ 모두 전역으로 제공.
    return typeof atob === "function" ? atob(b64 + pad) : "";
  } catch {
    return "";
  }
}

/**
 * 저장된 accessToken(JWT)의 sub 클레임에서 현재 사용자 id 를 꺼낸다.
 * 로그인 응답에 userId 가 없고 /api/v1/users/{id}/* 가 id 를 요구하므로,
 * 프로필·니즈·알림설정 호출 전에 이 값을 쓴다. 실패 시 null.
 */
export function getCurrentUserId(): number | null {
  const token = getAccessToken();
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length < 2) return null;
  try {
    const payload = JSON.parse(base64UrlDecode(parts[1])) as { sub?: string | number };
    const id = Number(payload.sub);
    return Number.isFinite(id) ? id : null;
  } catch {
    return null;
  }
}

// ---- 요청 실행 --------------------------------------------------------------

type RequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown; // 객체 → JSON, FormData → multipart, 그 외 생략
  query?: Record<string, string | number | boolean | undefined>;
  auth?: boolean; // 기본 true. false 면 Authorization 미첨부.
};

function buildUrl(path: string, query?: RequestOptions["query"]): string {
  const url = baseUrl.replace(/\/$/, "") + (path.startsWith("/") ? path : `/${path}`);
  if (!query) return url;
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) {
    if (v !== undefined) params.append(k, String(v));
  }
  const qs = params.toString();
  return qs ? `${url}?${qs}` : url;
}

async function parseBody(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text) return undefined;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function toApiError(status: number, body: unknown): ApiError {
  if (body && typeof body === "object") {
    const b = body as Record<string, unknown>;
    // 봉투 A: {code, message, fieldErrors}
    if (typeof b.code === "string") {
      return new ApiError(
        status,
        b.code,
        typeof b.message === "string" ? b.message : b.code,
        Array.isArray(b.fieldErrors) ? (b.fieldErrors as FieldError[]) : [],
      );
    }
    // 봉투 B: {data:null, error:{code, message}}
    const err = b.error as { code?: string; message?: string } | undefined;
    if (err && typeof err.code === "string") {
      return new ApiError(status, err.code, err.message ?? err.code);
    }
  }
  return new ApiError(status, `HTTP_${status}`, `요청에 실패했습니다. (HTTP ${status})`);
}

/** 원본 응답 바디를 그대로 반환. (봉투 없는 raw 응답용 — 예: 로그인) */
export async function requestRaw<T>(path: string, opts: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, query, auth = true } = opts;

  const headers: Record<string, string> = {};
  const isForm = typeof FormData !== "undefined" && body instanceof FormData;
  let payload: BodyInit | undefined;
  if (body !== undefined && body !== null) {
    if (isForm) {
      payload = body as FormData; // Content-Type 은 브라우저가 boundary 포함해 설정
    } else {
      headers["Content-Type"] = "application/json";
      payload = JSON.stringify(body);
    }
  }
  if (auth) {
    const token = getAccessToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(buildUrl(path, query), { method, headers, body: payload });
  const parsed = await parseBody(res);
  if (!res.ok) throw toApiError(res.status, parsed);
  return parsed as T;
}

type Envelope<T> = { success?: boolean; data: T; message?: string };

/** {success, data, message} 봉투를 벗겨 data 만 반환. */
export async function requestData<T>(path: string, opts: RequestOptions = {}): Promise<T> {
  const raw = await requestRaw<Envelope<T> | T>(path, opts);
  if (raw && typeof raw === "object" && "data" in (raw as object)) {
    return (raw as Envelope<T>).data;
  }
  return raw as T;
}
