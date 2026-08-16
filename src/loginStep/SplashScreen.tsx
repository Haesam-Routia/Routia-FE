import { useNavigate } from "react-router-dom"; // 1. useNavigate 임포트
import logo from "../assets/routia-logo-black-1.svg";
import logoText from "../assets/routia-text-img.svg";

export default function SplashScreen() {
  const navigate = useNavigate(); // 2. navigate 함수 선언

  const handleStart = () => {
    navigate("/login"); // 3. 이동하고 싶은 페이지 경로 입력 (예: /login 또는 /home)
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white px-6">
      <div className="flex w-full flex-col items-center text-center">
        <div className="mt-40">
          <img src={logo} alt="로고" className="w-[114px] h-[158px]" />
          <img src={logoText} alt="로고" className="w-[100px] h-[40px]" />
        </div>

        <div className="flex flex-col items-start gap-2 w-full px-3 mt-50">
          <div className="text-2xl font-semibold text-black">환영합니다!</div>
          <div className="text-xs font-normal text-stone-500">
            AI 맞춤형 안티에이징 루틴을 시작해보세요
          </div>
        </div>

        <button
          type="button"
          onClick={handleStart}
          className="w-full h-14 px-4 py-3.5 bg-buttonColor rounded-xl flex justify-center items-center mt-8 cursor-pointer hover:opacity-90 active:scale-98 transition-all"
        >
          <span className="text-white text-base font-semibold">
            지금 시작하기
          </span>
        </button>
      </div>
    </div>
  );
}
