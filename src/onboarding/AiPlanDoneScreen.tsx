import { useNavigate } from "react-router-dom";
import CheckItem from "./CheckItem";
import checkImg from "../assets/routia-check-pink.svg";
import OnboardingLayout, {
  OnboardingButton,
} from "../components/OnboardingLayout";
export default function AiPlanDoneScreen() {
  const navigate = useNavigate();

  return (
    <OnboardingLayout>
      <img src={checkImg} alt="완료" className="h-[100px] w-[100px]" />

      <h1 className="text-lg font-bold text-neutral-900">
        AI 플랜을 생성했어요
      </h1>
      <p className="text-xs text-neutral-500">
        AI 맞춤형 안티에이징 루틴을 시작해보세요
      </p>

      <ul className="mt-2 flex w-full flex-col gap-3 rounded-xl border border-neutral-200 p-4 text-left">
        <CheckItem done>신체정보 및 니즈 분석</CheckItem>
        <CheckItem done>피부 타입 및 난이도 반영</CheckItem>
        <CheckItem done>날씨·계절 데이터 결합</CheckItem>
        <CheckItem done>맞춤 루틴 생성</CheckItem>
      </ul>

      <p className="mt-13 text-sm text-neutral-500">
        앞으로 루티아와 함께 목표를 달성해봐요!
      </p>

      <OnboardingButton onClick={() => navigate("/onboarding/loading")}>
        홈 화면 가기
      </OnboardingButton>
    </OnboardingLayout>
  );
}
