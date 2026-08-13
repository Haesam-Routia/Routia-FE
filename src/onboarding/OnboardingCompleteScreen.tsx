import { useNavigate } from "react-router-dom";
import OnboardingLayout, { OnboardingButton } from "../components/OnboardingLayout";

export default function OnboardingCompleteScreen() {
  const navigate = useNavigate();

  return (
    <OnboardingLayout>
      <div className="flex flex-col items-center">
        <div className="mt-3 h-[100px] w-[100px]" /> 
        
        <h1 className="mt-3 text-2xl font-bold text-neutral-900">온보딩 완료!</h1>

        <p className="mt-[30px] text-base font-semibold text-neutral-900">
          AI 플랜 생성에 필요한 준비가 완료되었어요!
        </p>
        <p className="mt-2 text-xs text-neutral-500">
          가입하신 정보는 언제든 마이페이지에서 수정하실 수 있어요
        </p>

        <p className="mt-[55px] text-sm text-neutral-500">
          이제 나만의 플랜을 생성하러 가볼까요?
        </p>

        <OnboardingButton onClick={() => navigate("/onboarding/loading")}>
          AI 플랜 생성
        </OnboardingButton>
      </div>
    </OnboardingLayout>
  );
}