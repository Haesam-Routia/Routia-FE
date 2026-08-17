import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// VITE_API_BASE_URL 이 비어 있으면 프론트는 상대경로(/api/...)로 요청한다.
// 개발 중 백엔드가 http://localhost:8080 등에 떠 있으면 아래 프록시가 중계한다.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const proxyTarget = env.VITE_API_PROXY_TARGET || "http://localhost:8080";
  return {
    plugins: [react(), tailwindcss()],
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
