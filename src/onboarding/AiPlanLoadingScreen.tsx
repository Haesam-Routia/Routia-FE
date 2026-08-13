import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "../components/OnboardingLayout";
import CheckItem from "./Checkitem";
import loadingImg from "../assets/routia-loading-bold.svg";

const STEPS = [
  "신체정보 및 니즈 분석",
  "피부 타입 및 난이도 반영",
  "날씨·계절 데이터 결합",
  "맞춤 루틴 생성",
];

export default function AiPlanLoadingScreen() {
  const navigate = useNavigate();
  const [doneCount, setDoneCount] = useState(0);

  useEffect(() => {
    if (doneCount >= STEPS.length) {
      const t = setTimeout(() => navigate("/onboarding/done"), 800);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setDoneCount((c) => c + 1), 2000);
    return () => clearTimeout(t);
  }, [doneCount, navigate]);

  return (
    <OnboardingLayout>
      <img src={loadingImg} alt="로딩 중" className="h-[100px] w-[100px] animate-spin" />

      <h1 className="text-lg font-bold text-neutral-900">
        AI 플랜을 생성하고 있어요
      </h1>
      <p className="text-xs text-neutral-500">
        입력하신 정보를 분석해 맞춤 루틴을 준비 중입니다...
      </p>

      <ul className="mt-2 flex w-full flex-col gap-3 rounded-xl border border-neutral-200 p-4 text-left">
        {STEPS.map((label, i) => (
          <CheckItem key={label} done={i < doneCount}>
            {label}
          </CheckItem>
        ))}
      </ul>
    </OnboardingLayout>
  );
}