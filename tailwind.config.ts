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
        // 위클리 달력 등 Inter 지정용
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
