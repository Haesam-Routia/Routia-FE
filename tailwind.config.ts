/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainColor: "#ffe8ec",
        mainLightColor: "#FFF4F6",
        buttonColor: "#FF5D7B",
      },
      // 폰트 설정 추가
      fontFamily: {
        sans: [
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "Roboto",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
