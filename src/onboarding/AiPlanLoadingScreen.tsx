import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "../components/OnboardingLayout";
import CheckItem from "./CheckItem";
import loadingImg from "../assets/routia-loading-bold.svg";
import { completeOnboarding, getHome } from "../api";
import { tryApi } from "../api/netguard";
import { patchDraft } from "../store/onboardingDraft";

const STEPS = [
  "신체정보 및 니즈 분석",
  "피부 타입 및 난이도 반영",
  "날씨·계절 데이터 결합",
  "맞춤 루틴 생성",
];

export default function AiPlanLoadingScreen() {
  const navigate = useNavigate();
  const [doneCount, setDoneCount] = useState(0);
  const [homeReady, setHomeReady] = useState(false);

  // 화면 진입 시 실제 온보딩 완료 + AI 루틴 생성 호출을 1회만 실행.
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    void tryApi(() => completeOnboarding(), null).then(async (result) => {
      if (result?.routine) {
        patchDraft({}); // 드래프트 유지, 생성된 루틴은 세션에 별도 저장
        try {
          sessionStorage.setItem("routia.generatedRoutine", JSON.stringify(result.routine));
        } catch {
          /* 무시 */
        }
      }
      // 홈 화면 데이터를 미리 받아서 준비 확인
      try {
        await getHome();
        setHomeReady(true);
      } catch {
        /* 홈 데이터 실패 시 기존 플로우 유지 */
      }
    });
  }, []);

  useEffect(() => {
    if (doneCount >= STEPS.length) {
      // 애니메이션 완료 후: 홈 데이터가 준비되면 바로 홈으로, 아니면 done 화면으로
      const t = setTimeout(() => {
        navigate(homeReady ? "/home" : "/onboarding/done");
      }, 800);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setDoneCount((c) => c + 1), 2000);
    return () => clearTimeout(t);
  }, [doneCount, navigate, homeReady]);

  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500); // 0.5초마다 점 개수 변경

    return () => clearInterval(interval);
  }, []);

  return (
    <OnboardingLayout>
      <img
        src={loadingImg}
        alt="로딩 중"
        className="h-[100px] w-[100px] animate-[spin_2s_linear_infinite]"
      />

      <h1 className="text-lg font-bold text-neutral-900">AI 플랜을 생성하고 있어요</h1>

      {/* dots 변수를 뒤에 붙여줍니다 */}
      <p className="text-xs text-neutral-500">
        입력하신 정보를 분석해 맞춤 루틴을 준비 중입니다{dots}
      </p>

      <ul className="mt-2 flex w-full flex-col gap-3 rounded-xl border border-lineColor p-4 text-left">
        {STEPS.map((label, i) => (
          <CheckItem key={label} done={i < doneCount}>
            {label}
          </CheckItem>
        ))}
      </ul>
    </OnboardingLayout>
  );
}
