// 자체 플로우 테스트.
// 실제 src/api 클라이언트를 mock 백엔드에 연결해, 회원가입~홈~성취도까지
// 사용자 여정 전체를 순서대로 호출하고 각 단계를 검증한다.
import { startMockServer } from "./mockServer";
import {
  ApiError,
  setApiBaseUrl,
  clearAccessToken,
  getAccessToken,
  getCurrentUserId,
  checkEmailDuplicate,
  sendEmailVerificationCode,
  verifyEmailCode,
  signup,
  login,
  getOnboardingProgress,
  submitOnboardingStep0,
  submitOnboardingStep1,
  submitOnboardingStep2,
  submitOnboardingStep3,
  completeOnboarding,
  getHome,
  getTodayRoutines,
  toggleTodayItem,
  getTodayWeather,
  getProfile,
  getNeeds,
  updateNeeds,
  getNotificationSettings,
  updateNotificationSettings,
  getAchievementSummary,
  getAchievementHistory,
  getWeeklyTrend,
} from "../src/api";

// ---- 미니 테스트 하네스 ----
let passed = 0;
let failed = 0;
const results: string[] = [];
function check(name: string, cond: boolean, detail = "") {
  if (cond) {
    passed++;
    results.push(`  [32m✓[0m ${name}`);
  } else {
    failed++;
    results.push(`  [31m✗[0m ${name}${detail ? `  → ${detail}` : ""}`);
  }
}
async function expectError(name: string, code: string, run: () => Promise<unknown>) {
  try {
    await run();
    check(name, false, `오류가 발생하지 않음 (기대 code=${code})`);
  } catch (err) {
    const c = err instanceof ApiError ? err.code : String(err);
    check(name, c === code, `실제 code=${c}`);
  }
}

const EMAIL = "routia.tester@example.com";
const PASSWORD = "Routia-pass1!";
const NAME = "김루티";

async function main() {
  const { baseUrl, close } = await startMockServer();
  setApiBaseUrl(baseUrl);
  clearAccessToken();
  console.log(`\n▶ mock 서버: ${baseUrl}\n`);

  try {
    // 1) 이메일 중복 확인
    const dup = await checkEmailDuplicate(EMAIL);
    check("이메일 중복확인: 사용 가능", dup.available === true && dup.duplicated === false);

    // 2) 인증번호 발송 & 확인
    await sendEmailVerificationCode(EMAIL);
    check("인증번호 발송 성공", true);
    await expectError("잘못된 인증번호 → CODE_MISMATCH", "EMAIL_VERIFICATION_CODE_MISMATCH", () =>
      verifyEmailCode(EMAIL, "000000"),
    );
    await verifyEmailCode(EMAIL, "123456");
    check("인증번호 확인 성공", true);

    // 3) 회원가입 (비밀번호 불일치 오류 → 정상 가입)
    await expectError("비밀번호 불일치 → PASSWORD_CONFIRMATION_MISMATCH", "PASSWORD_CONFIRMATION_MISMATCH", () =>
      signup({ email: EMAIL, password: PASSWORD, passwordConfirm: "diff", name: NAME }),
    );
    await signup({ email: EMAIL, password: PASSWORD, passwordConfirm: PASSWORD, name: NAME });
    check("회원가입 성공 (201)", true);
    const dup2 = await checkEmailDuplicate(EMAIL);
    check("가입 후 중복확인: 사용 불가", dup2.duplicated === true && dup2.available === false);

    // 4) 로그인 (틀린 비번 → 정상 로그인 & 토큰 저장)
    await expectError("틀린 비밀번호 → INVALID_CREDENTIALS", "INVALID_CREDENTIALS", () =>
      login({ email: EMAIL, password: "wrong-pass" }),
    );
    const loginRes = await login({ email: EMAIL, password: PASSWORD });
    check("로그인 성공 + accessToken 수신", !!loginRes.accessToken && loginRes.tokenType === "Bearer");
    check("토큰이 클라이언트에 저장됨", getAccessToken() === loginRes.accessToken);

    // 5) 온보딩 단계 순서 검증
    const prog0 = await getOnboardingProgress();
    check("온보딩 진행조회: NOT_STARTED", prog0.status === "NOT_STARTED");
    await expectError("Step0 없이 Step1 → STEP_ORDER_INVALID", "ONBOARDING_STEP_ORDER_INVALID", () =>
      submitOnboardingStep1({
        height: 165.5, weight: 55.2, gender: "FEMALE", ageGroup: "TWENTIES",
        regionSido: "서울특별시", regionSigungu: "강남구", latitude: 37.5172, longitude: 127.0473,
      }),
    );

    const s0 = await submitOnboardingStep0(NAME);
    check("Step0 저장 (이름)", s0.status === "IN_PROGRESS");
    const s1 = await submitOnboardingStep1({
      height: 165.5, weight: 55.2, gender: "FEMALE", ageGroup: "TWENTIES",
      regionSido: "서울특별시", regionSigungu: "강남구", latitude: 37.5172, longitude: 127.0473,
    });
    check("Step1 저장 (lastCompletedStep=1)", s1.lastCompletedStep === 1 && !!s1.step1CompletedAt);
    const s2 = await submitOnboardingStep2({
      skinType: "DRY", skinConcerns: ["ACNE", "PORE"], ownedTools: ["FACE_FASCIA_TOOL"],
      bodyConcerns: ["SWELLING"], bodyGoals: ["MAINTAIN", "BUILD_HABIT"],
    });
    check("Step2 저장 (lastCompletedStep=2)", s2.lastCompletedStep === 2);
    const s3 = await submitOnboardingStep3({ routineTimePreference: "MORNING", routineDifficulty: "SIMPLE" });
    check("Step3 저장 (lastCompletedStep=3)", s3.lastCompletedStep === 3);

    // 6) 온보딩 완료 + AI 루틴 생성
    const done = await completeOnboarding();
    check("온보딩 완료: COMPLETED", done.status === "COMPLETED" && !!done.completedAt);
    check("AI 루틴 생성됨 (items > 0)", done.routine.items.length > 0);

    // 7) 홈 화면
    const home = await getHome();
    check("홈 조회: userName 일치", home.userName === NAME);
    check("홈 진행률 계산 일치", home.progressPercent === Math.round((home.completedCount / home.totalCount) * 100));
    check("홈 미리보기 최대 3개", home.todayTasks.length <= 3);

    // 8) 오늘 할 일 + 토글
    const today = await getTodayRoutines();
    check("오늘 할 일 전체 조회", today.items.length === home.totalCount);
    const target = today.items.find((i) => !i.completed);
    if (target) {
      const before = target.completed;
      const t1 = await toggleTodayItem(target.itemId);
      check("체크박스 토글 (완료로 변경)", t1.completed === !before);
      const t2 = await toggleTodayItem(target.itemId);
      check("체크박스 재토글 (원복)", t2.completed === before);
    } else {
      check("토글 대상 존재", false, "미완료 항목 없음");
    }

    // 9) 날씨
    const weather = await getTodayWeather();
    check("날씨 조회 (지역/자외선)", !!weather.regionSido && typeof weather.uvIndex === "number");

    // 10) 프로필 / 니즈 조회 & 수정 — userId 는 JWT sub 에서 디코드 (실서버와 동일)
    const userId = getCurrentUserId();
    check("JWT sub 에서 userId 디코드", typeof userId === "number" && userId! > 0);
    const profile = await getProfile(userId!);
    check("프로필 조회: 이름 일치", profile.userName === NAME);
    check("프로필 조회: Step1 위치 반영", profile.regionSigungu === "강남구");
    const needs = await getNeeds(userId!);
    check("니즈 조회: skinType 반영", needs.skinType === "DRY");
    const updated = await updateNeeds(userId!, { routineDifficulty: "MINIMAL" });
    check("니즈 수정: MINIMAL 반영", updated.routineDifficulty === "MINIMAL");

    // 10-b) 알림 설정 (정보수정 '알림' 탭)
    const noti0 = await getNotificationSettings(userId!);
    check("알림설정 초기값: OFF", noti0.notificationEnabled === false);
    await expectError("알림 ON인데 시간 누락 → INVALID_REQUEST", "INVALID_REQUEST", () =>
      updateNotificationSettings(userId!, { notificationEnabled: true, notificationTime: null }),
    );
    const noti1 = await updateNotificationSettings(userId!, {
      notificationEnabled: true,
      notificationTime: "08:30",
    });
    check("알림설정 수정: ON + 08:30", noti1.notificationEnabled === true && noti1.notificationTime === "08:30");

    // 11) 권한 검증 (다른 사용자 id 접근 차단)
    await expectError("타 사용자 프로필 접근 → ACCESS_DENIED", "USER_DATA_ACCESS_DENIED", () =>
      getProfile(userId! + 999),
    );

    // 12) 성취도
    const summary = await getAchievementSummary();
    check("성취도 요약 (streakDays)", summary.streakDays === 7);
    const history = await getAchievementHistory();
    check("과거 기록 3주치", history.weeks.length === 3);
    const trend = await getWeeklyTrend();
    check("주간 추이 조회", trend.days.length > 0);

    // 13) 미인증 접근 차단 (401)
    clearAccessToken();
    await expectError("토큰 없이 홈 접근 → HTTP_401", "HTTP_401", () => getHome());
  } finally {
    await close();
  }

  console.log(results.join("\n"));
  console.log(`\n${failed === 0 ? "[32m" : "[31m"}━━━ ${passed} passed, ${failed} failed ━━━[0m\n`);
  // process.exit() 를 쓰면 Windows/libuv 가 핸들 종료 중 assert 로 죽을 수 있어
  // exitCode 만 지정하고 이벤트 루프가 자연스럽게 비워지도록 둔다.
  process.exitCode = failed === 0 ? 0 : 1;
}

main().catch((e) => {
  console.error("테스트 실행 오류:", e);
  process.exitCode = 1;
});
