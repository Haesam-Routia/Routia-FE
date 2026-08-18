import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// VITE_API_BASE_URL 이 비어 있으면 프론트는 상대경로(/api/...)로 요청한다.
// 개발 중 백엔드(실서버 또는 `npm run mock`)가 뜨면 그 주소로 직접 호출한다.
export default defineConfig(({ mode }) => {
  // 일부 실행 환경에서 process.cwd() 가 프로젝트 루트가 아닐 수 있어,
  // config 파일 위치(import.meta.dirname)를 기준으로 .env 를 읽는다.
  const root = import.meta.dirname;
  const env = loadEnv(mode, root, "");
  const apiBase = env.VITE_API_BASE_URL || "";
  const proxyTarget = env.VITE_API_PROXY_TARGET || "http://localhost:8080";
  return {
    plugins: [react(), tailwindcss()],
    // import.meta.env 가 주입되지 않는 환경 대비: 빌드 시 base URL 을 상수로 심는다.
    define: { __ROUTIA_API_BASE__: JSON.stringify(apiBase) },
    server: {
      // 경로에 공백이 있어 8.3 단축경로(LIKELI~1)로 실행될 때 fs allow-list 불일치로
      // 모듈이 403 나는 것을 방지.
      fs: { strict: false },
      proxy: {
        "/api": {
          target: proxyTarget,
          changeOrigin: true,
        },
      },
    },
  };
});
