/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainColor: "#ffe8ec",
        mainLightColor: "#FFF4F6",
        buttonColor: "#FF5D7B",
        buttonPressedColor: "#4C4C4C",
        inputBorder: "#ECECEC",
        inputon: "#FFF1F3",
        textColor: "#252525",
        subtextColor : "#7C7C7C",
        lineColor: "#DDDDDD",
        starColor: "#CE0000",
        editbuttonColor: "#FFB5BF",
        editbuttonBorder: "#FF8E9E",
        // New onboarding design system
        ob: {
          bg: "#FBF6F4",
          surface: "#FFFFFF",
          primary: "#FF6B7A",
          "primary-deep": "#DB4A5E",
          "primary-soft": "#FFE7E9",
          "primary-softer": "#FFF3F3",
          "primary-text": "#C6394D",
          ink: "#2B2320",
          "ink-soft": "#8A7E78",
          "ink-faint": "#C3B7B1",
          border: "#F1E5E1",
          "border-strong": "#EBD5D0",
        },
      },
      borderRadius: {
        "ob-lg": "20px",
        "ob-md": "14px",
      },
      boxShadow: {
        "ob-card": "0 1px 2px rgba(60,30,30,0.04), 0 8px 20px -12px rgba(219,74,94,0.18)",
        "ob-btn": "0 10px 24px -6px rgba(219,74,94,0.45)",
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
