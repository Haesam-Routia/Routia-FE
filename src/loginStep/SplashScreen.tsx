import logo from "../assets/routia-logo-black-1.svg";
import logoText from "../assets/routia-text-img.svg";

export default function SplashScreen() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-mainLightColor px-6">
      <div className="flex w-full max-w-sm flex-col items-center text-center">
        <div className="mt-40">
          <img src={logo} alt="로고" className="w-28.5 h-39.5" />
          <img src={logoText} alt="로고" className="w-25 h-10" />
        </div>

        <div className="flex flex-col items-start gap-2 w-full px-3 mt-50">
          <div className="text-2xl font-semibold text-black">환영합니다!</div>
          <div className="text-xs font-normal text-stone-500">
            AI 맞춤형 안티에이징 루틴을 시작해보세요
          </div>
        </div>

        <div className="w-full h-14 px-4 py-3.5 bg-buttonColor rounded-xl inline-flex justify-center items-center mt-8">
          <div className="justify-start text-white text-base font-semibold  ">
            지금 시작하기
          </div>
        </div>
      </div>
    </div>
  );
}
