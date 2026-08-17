// 온보딩 임시 저장소.
// 온보딩 단계 화면들이 서로 다른 라우트로 분리돼 있어, 단계 간 입력을 이어붙이기 위해
// sessionStorage 기반의 간단한 드래프트를 둔다. (새로고침에도 유지)
import type {
  AgeGroup,
  BodyConcern,
  BodyGoal,
  Gender,
  OwnedTool,
  RoutineDifficulty,
  RoutineTimePreference,
  SkinConcern,
  SkinType,
} from "../api";

export type OnboardingDraft = {
  name?: string;
  height?: number;
  weight?: number;
  gender?: Gender;
  ageGroup?: AgeGroup;
  regionSido?: string;
  regionSigungu?: string;
  latitude?: number;
  longitude?: number;
  skinType?: SkinType;
  skinConcerns?: SkinConcern[];
  ownedTools?: OwnedTool[];
  bodyConcerns?: BodyConcern[];
  bodyGoals?: BodyGoal[];
  routineTimePreference?: RoutineTimePreference;
  routineDifficulty?: RoutineDifficulty;
};

const KEY = "routia.onboardingDraft";

export function readDraft(): OnboardingDraft {
  try {
    if (typeof sessionStorage === "undefined") return {};
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as OnboardingDraft) : {};
  } catch {
    return {};
  }
}

export function patchDraft(patch: Partial<OnboardingDraft>): OnboardingDraft {
  const next = { ...readDraft(), ...patch };
  try {
    if (typeof sessionStorage !== "undefined") sessionStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* 무시 */
  }
  return next;
}

export function clearDraft(): void {
  try {
    if (typeof sessionStorage !== "undefined") sessionStorage.removeItem(KEY);
  } catch {
    /* 무시 */
  }
}
