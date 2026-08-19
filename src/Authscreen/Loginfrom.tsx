import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { inputClass } from "../components/common";
import { ApiError, login } from "../api";
import { getOnboardingProgress } from "../api/onboarding";
import { isNetworkError } from "../api/netguard";
import type { OnboardingProgress } from "../api/types";

/**
 * 온보딩 진행 상태에 따라 이동할 경로를 결정한다.
 * - COMPLETED: 홈
 * - GENERATING: AI 루틴 생성 중 화면
 * - NOT_STARTED: 온보딩 프로필(step0)
 * - IN_PROGRESS: lastCompletedStep 기준으로 다음 스텝
 * - FAILED: 마지막 완료 스텝 다음부터 재시도
 */
function resolveOnboardingRoute(progress: OnboardingProgress): string {
  switch (progress.status) {
    case "COMPLETED":
      return "/home";
    case "GENERATING":
      return "/onboarding/loading";
    case "NOT_STARTED":
      return "/onboarding/profile";
    case "IN_PROGRESS":
    case "FAILED":
    default: {
      const step = progress.lastCompletedStep;
      if (step === 0) return "/onboarding/step1";
      if (step === 1) return "/onboarding/step2";
      if (step === 2) return "/onboarding/step3";
      // step 3까지 완료했으면 루틴 생성 진입
      return "/onboarding/loading";
    }
  }
}

/**
 * 로그인: 이메일 / 비밀번호 폼.
 * SignupForm과 동일한 inputClass, buttonColor 계열 클래스를 사용해
 * 탭 전환 시 톤이 이어지도록 맞췄습니다.
 */
export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFilled = useMemo(
    () => email.trim().length > 0 && password.trim().length > 0,
    [email, password],
  );

  const handleSubmit = async () => {
    if (!isFilled || isSubmitting) return;
    setError(null);
    setIsSubmitting(true);
    try {
      await login({ email: email.trim(), password });
      // 온보딩 진행 상태 조회 후 적절한 페이지로 이동
      try {
        const progress = await getOnboardingProgress();
        navigate(resolveOnboardingRoute(progress));
      } catch {
        // 온보딩 조회 실패 시 홈으로 이동
        navigate("/home");
      }
    } catch (err) {
      // 백엔드 미가동(네트워크 실패)이면 프로토타입 데모를 위해 그대로 진행.
      if (isNetworkError(err)) {
        navigate("/home");
        return;
      }
      if (err instanceof ApiError) {
        setError(
          err.code === "INVALID_CREDENTIALS"
            ? "이메일 또는 비밀번호가 일치하지 않습니다"
            : err.message,
        );
      } else {
        setError("로그인 중 오류가 발생했습니다");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col mt-10">
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputClass}
      />

      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={`${inputClass} mt-3`}
      />
      {error && <p className="text-xs mt-2 text-rose-500">{error}</p>}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={!isFilled || isSubmitting}
        className={`mt-6 flex h-12.5 w-full shrink-0 items-center justify-center rounded-[10px] text-sm font-semibold text-white ${
          isFilled && !isSubmitting ? "bg-buttonColor" : "bg-buttonPressedColor opacity-50"
        }`}
      >
        {isSubmitting ? "로그인 중..." : "로그인"}
      </button>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-buttonPressedColor">
        <button type="button" onClick={() => navigate("/find-email")} className="underline">
          이메일 찾기
        </button>
        <span>|</span>
        <button type="button" onClick={() => navigate("/find-password")} className="underline">
          비밀번호 찾기
        </button>
      </div>
    </div>
  );
}
