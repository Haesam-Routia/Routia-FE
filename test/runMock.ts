// Notion 명세서 기반 mock 백엔드를 로컬 개발 서버로 띄운다.
// 실서버가 없어도 앱을 실제로 클릭하며 확인할 수 있게 해준다.
//   실행:  npm run mock   (기본 포트 8080)
// 그리고 다른 터미널에서  npm run dev  → 앱이 이 mock 을 바라봄
// (.env.local 의 VITE_API_BASE_URL=http://localhost:8080)
import { startMockServer, DEMO_ACCOUNT } from "./mockServer";

const PORT = Number(process.env.MOCK_PORT) || 8080;

startMockServer({ port: PORT, seed: true }).then(() => {
  console.log(`\n▶ Routia mock 백엔드 (Notion 명세 기반) — http://localhost:${PORT}`);
  console.log(`  데모 계정: ${DEMO_ACCOUNT.email} / ${DEMO_ACCOUNT.password}  (이미 온보딩 완료됨)`);
  console.log(`  · 새 가입도 가능(이메일 인증코드는 항상 123456)`);
  console.log(`  종료: Ctrl+C\n`);
});
