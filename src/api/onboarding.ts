// 온보딩 엔드포인트 (/api/v1/onboarding/*)
import { requestData } from "./http";
import type {
  OnboardingCompleteResult,
  OnboardingProgress,
  Step1Request,
  Step2Request,
  Step3Request,
} from "./types";

/** 온보딩 진행 상태 조회. (중간 이탈 후 재접속 대비) */
export function getOnboardingProgress(): Promise<OnboardingProgress> {
  return requestData<OnboardingProgress>("/api/v1/onboarding/progress", { method: "GET" });
}

/** 0단계: 이름 + (선택) 프로필 이미지. multipart. */
export function submitOnboardingStep0(
  userName: string,
  profileImage?: File | Blob,
): Promise<OnboardingProgress> {
  const form = new FormData();
  form.append("userName", userName);
  if (profileImage) form.append("profileImage", profileImage);
  return requestData<OnboardingProgress>("/api/v1/onboarding/step0", {
    method: "POST",
    body: form,
  });
}

/** 1단계: 신체/위치 정보. */
export function submitOnboardingStep1(req: Step1Request): Promise<OnboardingProgress> {
  return requestData<OnboardingProgress>("/api/v1/onboarding/step1", { method: "POST", body: req });
}

/** 2단계: 피부/신체 니즈. */
export function submitOnboardingStep2(req: Step2Request): Promise<OnboardingProgress> {
  return requestData<OnboardingProgress>("/api/v1/onboarding/step2", { method: "POST", body: req });
}

/** 3단계: 루틴 난이도/시간대. */
export function submitOnboardingStep3(req: Step3Request): Promise<OnboardingProgress> {
  return requestData<OnboardingProgress>("/api/v1/onboarding/step3", { method: "POST", body: req });
}

/** 온보딩 완료 + 최초 AI 루틴 생성. */
export function completeOnboarding(): Promise<OnboardingCompleteResult> {
  return requestData<OnboardingCompleteResult>("/api/v1/onboarding/complete", { method: "POST" });
}
