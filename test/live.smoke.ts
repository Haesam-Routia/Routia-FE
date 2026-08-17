// 실서버 스모크 테스트 — 실제 src/api 클라이언트를 배포된 백엔드에 그대로 붙여
// 계정 생성/이메일 발송 없이 안전한(읽기전용) 경로만 검증한다.
// 실행: npm run test:live
import {
  ApiError,
  setApiBaseUrl,
  clearAccessToken,
  checkEmailDuplicate,
  login,
  getHome,
} from "../src/api";

const BASE = "https://port-0-routia-backend-mnhfhlid34c7c977.sel3.cloudtype.app";

let pass = 0;
let fail = 0;
const line = (ok: boolean, name: string, extra = "") => {
  if (ok) pass++;
  else fail++;
  console.log(`  ${ok ? "\x1b[32m✓\x1b[0m" : "\x1b[31m✗\x1b[0m"} ${name}${extra ? "  → " + extra : ""}`);
};

async function main() {
  setApiBaseUrl(BASE);
  clearAccessToken();
  console.log(`\n▶ 실서버: ${BASE}\n`);

  // 0) 서버 헬스체크 — 다운(cloudtype 404/네트워크 실패)이면 깔끔히 스킵
  try {
    const dup = await checkEmailDuplicate(`nobody-${Date.now()}@example.com`);
    line(
      typeof dup.duplicated === "boolean" && typeof dup.available === "boolean",
      "중복확인 응답 파싱",
      JSON.stringify(dup),
    );
  } catch (e) {
    const down = e instanceof ApiError && (e.status === 404 || e.status === 0);
    console.log(
      `  \x1b[33m⚠\x1b[0m 실서버 응답 없음 — 백엔드 다운으로 보임 (${e instanceof ApiError ? e.status : e}). 스모크 스킵.`,
    );
    console.log(
      "\n  (참고) 클라이언트↔실서버 계약은 백엔드 가동 시 재실행하면 검증됩니다. mock 기반 전체 검증은 `npm run test:flow`.\n",
    );
    process.exitCode = down ? 0 : 1; // 다운은 실패로 치지 않음
    return;
  }

  // 2) 잘못된 로그인 → 401 INVALID_CREDENTIALS (오류 봉투 {code,...} 파싱)
  try {
    await login({ email: "nobody@example.com", password: "definitely-wrong" });
    line(false, "잘못된 로그인 → 401", "오류가 발생하지 않음");
  } catch (e) {
    const ok = e instanceof ApiError && e.status === 401 && e.code === "INVALID_CREDENTIALS";
    line(ok, "잘못된 로그인 → INVALID_CREDENTIALS", e instanceof ApiError ? `${e.status} ${e.code}` : String(e));
  }

  // 3) 토큰 없이 홈 → 401 (인증 가드)
  try {
    await getHome();
    line(false, "토큰 없이 홈 → 401", "오류가 발생하지 않음");
  } catch (e) {
    const ok = e instanceof ApiError && e.status === 401;
    line(ok, "토큰 없이 홈 → 401", e instanceof ApiError ? String(e.status) : String(e));
  }

  console.log(`\n${fail === 0 ? "\x1b[32m" : "\x1b[31m"}━━━ ${pass} passed, ${fail} failed ━━━\x1b[0m\n`);
  process.exitCode = fail === 0 ? 0 : 1;
}

main().catch((e) => {
  console.error("실행 오류:", e);
  process.exitCode = 1;
});
