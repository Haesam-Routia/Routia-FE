import { useNavigate } from "react-router-dom";
import OnboardingLayout, { OnboardingButton } from "../components/OnboardingLayout";
import checkImg from "../assets/routia-check-pink.svg";

export default function OnboardingCompleteScreen() {
  const navigate = useNavigate();

  return (
    <OnboardingLayout>
      <div className="flex flex-col items-center w-full">
        <img src={checkImg} alt="완료" className="h-[100px] w-[100px]" />

        <p className="mt-4 text-lg font-bold text-neutral-900">온보딩 완료!</p>

        <p className="mt-22.5 text-base font-semibold text-neutral-900">
          AI 플랜 생성에 필요한 준비가 완료되었어요!
        </p>
        <p className="mt-2 text-xs text-neutral-500">
          가입하신 정보는 언제든 마이페이지에서 수정하실 수 있어요
        </p>

        <p className="mt-34 text-sm text-neutral-500 mb-4">이제 나만의 플랜을 생성하러 가볼까요?</p>

        <OnboardingButton onClick={() => navigate("/onboarding/loading")}>
          AI 플랜 생성
        </OnboardingButton>
      </div>
    </OnboardingLayout>
  );
}
