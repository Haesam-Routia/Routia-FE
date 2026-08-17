// 화면의 한글 라벨 ↔ API enum 코드 매핑.
// 온보딩 화면들이 한글 문자열을 상태로 들고 있어, API 전송 직전에 코드로 변환한다.
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
} from "./types";

export const GENDER_BY_LABEL: Record<string, Gender> = {
  여성: "FEMALE",
  female: "FEMALE",
  남성: "MALE",
  male: "MALE",
};

export const AGE_GROUP_BY_LABEL: Record<string, AgeGroup> = {
  "10대": "TEENS",
  "20대": "TWENTIES",
  "30대": "THIRTIES",
  "40대": "FORTIES",
  "50대": "FIFTIES_PLUS",
};

export const SKIN_TYPE_BY_LABEL: Record<string, SkinType> = {
  중성: "NORMAL",
  건성: "DRY",
  지성: "OILY",
  복합성: "COMBINATION",
  민감성: "SENSITIVE",
  수부지: "DEHYDRATED_OILY",
};

export const SKIN_CONCERN_BY_LABEL: Record<string, SkinConcern> = {
  여드름: "ACNE",
  모공: "PORE",
  탄력: "ELASTICITY",
  주름: "WRINKLE",
  색소: "PIGMENTATION",
  피지: "SEBUM",
};

export const BODY_CONCERN_BY_LABEL: Record<string, BodyConcern> = {
  붓기: "SWELLING",
  피로감: "FATIGUE",
  "체형 변화": "BODY_SHAPE_CHANGE",
  혈액순환: "CIRCULATION",
  "체중 감소": "WEIGHT_LOSS",
};

export const BODY_GOAL_BY_LABEL: Record<string, BodyGoal> = {
  근성장: "MUSCLE_GAIN",
  "근육 증가": "MUSCLE_GAIN",
  "현상 유지": "MAINTAIN",
  "현재 상태 유지": "MAINTAIN",
  "체지방 줄이기": "FAT_LOSS",
  "체지방 감소": "FAT_LOSS",
  "습관 잡기": "BUILD_HABIT",
  "생활 습관 형성": "BUILD_HABIT",
  "규칙적인 생활": "REGULAR_LIFE",
};

export const OWNED_TOOL_BY_VALUE: Record<string, OwnedTool> = {
  absorb: "SKINCARE_ABSORPTION_DEVICE",
  body: "BODY_FASCIA_TOOL",
  face: "FACE_FASCIA_TOOL",
  peeling: "EXFOLIATING_PRODUCT",
};

export const TIME_PREFERENCE_BY_LABEL: Record<string, RoutineTimePreference> = {
  아침형: "MORNING",
  저녁형: "EVENING",
  상관없음: "ANY",
};

export const DIFFICULTY_BY_VALUE: Record<string, RoutineDifficulty> = {
  complex: "COMPLEX",
  medium: "SIMPLE", // 화면상 중간 난이도 → SIMPLE
  simple: "MINIMAL",
};

/** 라벨 배열을 코드 배열로 변환하고, 매핑 안 되는 값은 조용히 버린다. */
export function mapLabels<T>(labels: string[], table: Record<string, T>): T[] {
  const out: T[] = [];
  for (const label of labels) {
    const code = table[label];
    if (code !== undefined && !out.includes(code)) out.push(code);
  }
  return out;
}

// ---- 역매핑: API 코드 → 화면 라벨 (정보수정 화면 로딩용) --------------------
// 라벨→코드 맵은 한 코드에 여러 라벨이 있을 수 있어(예: 근성장/근육 증가), 화면이
// 실제 쓰는 라벨로 명시적으로 되돌린다.

export const GENDER_VALUE_BY_CODE: Record<string, string> = {
  FEMALE: "female",
  MALE: "male",
  UNSPECIFIED: "",
};
export const AGE_LABEL_BY_CODE: Record<string, string> = {
  TEENS: "10대",
  TWENTIES: "20대",
  THIRTIES: "30대",
  FORTIES: "40대",
  FIFTIES_PLUS: "50대",
};
export const SKIN_TYPE_LABEL_BY_CODE: Record<string, string> = {
  NORMAL: "중성",
  DRY: "건성",
  OILY: "지성",
  COMBINATION: "복합성",
  SENSITIVE: "민감성",
  DEHYDRATED_OILY: "수부지",
};
export const SKIN_CONCERN_LABEL_BY_CODE: Record<string, string> = {
  ACNE: "여드름",
  PORE: "모공",
  ELASTICITY: "탄력",
  WRINKLE: "주름",
  PIGMENTATION: "색소",
  SEBUM: "피지",
};
export const BODY_CONCERN_LABEL_BY_CODE: Record<string, string> = {
  SWELLING: "붓기",
  FATIGUE: "피로감",
  BODY_SHAPE_CHANGE: "체형 변화",
  CIRCULATION: "혈액순환",
  WEIGHT_LOSS: "체중 감소",
};
export const BODY_GOAL_LABEL_BY_CODE: Record<string, string> = {
  MUSCLE_GAIN: "근성장",
  MAINTAIN: "현상 유지",
  FAT_LOSS: "체지방 줄이기",
  BUILD_HABIT: "습관 잡기",
  REGULAR_LIFE: "규칙적인 생활",
};
export const TIME_PREF_LABEL_BY_CODE: Record<string, string> = {
  MORNING: "아침형",
  EVENING: "저녁형",
  ANY: "상관없음",
};
export const DIFFICULTY_VALUE_BY_CODE: Record<string, string> = {
  COMPLEX: "complex",
  SIMPLE: "medium",
  MINIMAL: "simple",
};

/** 코드 배열 → 화면 라벨 배열. 매핑 안 되는 코드는 버린다. */
export function mapCodesToLabels(codes: string[] | undefined, table: Record<string, string>): string[] {
  if (!codes) return [];
  const out: string[] = [];
  for (const code of codes) {
    const label = table[code];
    if (label && !out.includes(label)) out.push(label);
  }
  return out;
}
