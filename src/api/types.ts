// API 스펙에 정의된 enum / DTO 타입.
// erasableSyntaxOnly 규칙상 TS enum 대신 유니온 타입 + const 코드맵을 사용한다.

export type Gender = "FEMALE" | "MALE" | "UNSPECIFIED";
export type AgeGroup = "TEENS" | "TWENTIES" | "THIRTIES" | "FORTIES" | "FIFTIES_PLUS";
export type SkinType =
  | "NORMAL"
  | "DRY"
  | "OILY"
  | "COMBINATION"
  | "SENSITIVE"
  | "DEHYDRATED_OILY";
export type RoutineTimePreference = "MORNING" | "EVENING" | "ANY";
export type RoutineDifficulty = "COMPLEX" | "SIMPLE" | "MINIMAL";
export type LocationSource = "GPS" | "MANUAL";
export type OnboardingStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "GENERATING"
  | "COMPLETED"
  | "FAILED";
export type TimeSlot = "MORNING" | "AFTERNOON" | "EVENING" | "BEFORE_SLEEP";

export type SkinConcern = "ACNE" | "PORE" | "ELASTICITY" | "WRINKLE" | "PIGMENTATION" | "SEBUM";
export type BodyConcern =
  | "SWELLING"
  | "FATIGUE"
  | "BODY_SHAPE_CHANGE"
  | "CIRCULATION"
  | "WEIGHT_LOSS";
export type BodyGoal = "MUSCLE_GAIN" | "MAINTAIN" | "FAT_LOSS" | "BUILD_HABIT" | "REGULAR_LIFE";
export type OwnedTool =
  | "SKINCARE_ABSORPTION_DEVICE"
  | "BODY_FASCIA_TOOL"
  | "FACE_FASCIA_TOOL"
  | "EXFOLIATING_PRODUCT";

// ---- Auth -------------------------------------------------------------------

export type LoginRequest = { email: string; password: string };
export type LoginResponse = { accessToken: string; tokenType: string };
export type SignupRequest = {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
};
export type EmailCheckResponse = { duplicated: boolean; available: boolean };

// ---- Onboarding -------------------------------------------------------------

export type OnboardingProgress = {
  status: OnboardingStatus;
  lastCompletedStep: number;
  step1CompletedAt: string | null;
  step2CompletedAt: string | null;
  step3CompletedAt: string | null;
  completedAt: string | null;
};

export type Step1Request = {
  height: number;
  weight: number;
  gender: Gender;
  ageGroup: AgeGroup;
  regionSido: string;
  regionSigungu: string;
  latitude: number;
  longitude: number;
};

export type Step2Request = {
  skinType: SkinType;
  skinConcerns: SkinConcern[];
  ownedTools: OwnedTool[];
  bodyConcerns: BodyConcern[];
  bodyGoals: BodyGoal[];
};

export type Step3Request = {
  routineTimePreference: RoutineTimePreference;
  routineDifficulty: RoutineDifficulty;
};

export type RoutineItem = {
  timeSlot: TimeSlot;
  category: string;
  title: string;
  detail: string;
  effectCode: string;
  expectedEffect: string;
};

export type GeneratedRoutine = {
  routineId: number;
  directionText: string;
  homeComment: string;
  items: RoutineItem[];
};

export type OnboardingCompleteResult = OnboardingProgress & { routine: GeneratedRoutine };

// ---- Home / Routines / Weather ---------------------------------------------

export type HomeTask = { itemId: number; title: string; completed: boolean };

export type HomeResponse = {
  userName: string;
  date: string;
  directionText: string;
  homeComment: string;
  progressPercent: number;
  completedCount: number;
  totalCount: number;
  todayTasks: HomeTask[];
};

export type TodayRoutineItem = {
  itemId: number;
  timeSlot: TimeSlot;
  title: string;
  completed: boolean;
};

export type TodayRoutinesResponse = {
  date: string;
  completedCount: number;
  totalCount: number;
  items: TodayRoutineItem[];
};

export type ToggleTaskResponse = { itemId: number; completed: boolean };

export type WeatherResponse = {
  regionSido: string;
  regionSigungu: string;
  temperature: number;
  feelsLike: number;
  weatherDescription: string;
  temperatureTip: string;
  uvIndex: number;
  uvLevel: string;
  uvTip: string;
};

// ---- Profile / Needs --------------------------------------------------------

export type ProfileResponse = {
  userName: string;
  height: number | null;
  weight: number | null;
  gender: Gender | null;
  ageGroup: AgeGroup | null;
  profileImage: string | null;
  regionSido: string | null;
  regionSigungu: string | null;
  latitude: number | null;
  longitude: number | null;
  locationSource: LocationSource | null;
  locationUpdatedAt: string | null;
};

export type ProfileUpdateRequest = Partial<{
  height: number;
  weight: number;
  gender: Gender;
  ageGroup: AgeGroup;
  regionSido: string;
  regionSigungu: string;
  latitude: number;
  longitude: number;
  locationSource: LocationSource;
}>;

export type NeedsResponse = {
  bodyGoal: BodyGoal | null;
  bodyGoals: BodyGoal[];
  bodyConcerns: BodyConcern[];
  skinType: SkinType | null;
  skinConcerns: SkinConcern[];
  ownedTools: OwnedTool[];
  routineTimePreference: RoutineTimePreference | null;
  routineDifficulty: RoutineDifficulty | null;
};

export type NeedsUpdateRequest = Partial<{
  bodyGoal: BodyGoal;
  bodyGoals: BodyGoal[];
  bodyConcerns: BodyConcern[];
  skinType: SkinType;
  skinConcerns: SkinConcern[];
  ownedTools: OwnedTool[];
  routineTimePreference: RoutineTimePreference;
  routineDifficulty: RoutineDifficulty;
}>;

// ---- Achievements -----------------------------------------------------------

export type AchievementSummary = {
  weeklyPerformanceRate: number;
  previousWeekDiff: number;
  avgCompletedCount: number;
  streakDays: number;
};

export type AchievementWeek = {
  weekStart: string;
  weekEnd: string;
  performanceRate: number;
  completedCount: number;
  totalCount: number;
};

export type AchievementHistory = { weeks: AchievementWeek[] };

export type WeeklyTrendDay = { date: string; completedCount: number; totalCount: number };
export type WeeklyTrend = { days: WeeklyTrendDay[] };
