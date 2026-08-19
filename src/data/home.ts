// 홈 화면 목업 데이터 (백엔드 미정 → mock)

export interface WeatherInfo {
  location: string;
  temp: number;
  feelsLike: number;
  condition: string;
  uvIndex: number;
  uvLevel: string;
  uvDesc: string;
}

export interface ProgressInfo {
  effect: string;
  percent: number; // 원형 게이지 표시 수치
  done: number;
  total: number;
}

export interface TodoItem {
  id: number;
  label: string;
  done: boolean;
}

export interface TodoSection {
  period: string; // 오전 / 오후 / 저녁
  items: TodoItem[];
}

export const weather: WeatherInfo = {
  location: "서울 강남구",
  temp: 28,
  feelsLike: 30,
  condition: "맑음",
  uvIndex: 7,
  uvLevel: "높음",
  uvDesc: "자외선 차단 필수\n야외 활동 주의하세요",
};

export const progress: ProgressInfo = {
  effect: "피부 톤 개선 · 붓기 완화",
  percent: 80,
  done: 4,
  total: 7,
};

export const todoGuide =
  "오늘은 자외선이 강한 맑은 날씨라\n아침 보습과 자외선 차단에 신경 쓰는 것이 좋아요.";

// 홈 카드용 (오전만 노출)
export const todoSections: TodoSection[] = [
  {
    period: "오전",
    items: [
      { id: 1, label: "림프 마사지 5분", done: true },
      { id: 2, label: "수분 크림과 자외선 차단제 바르기", done: true },
      { id: 3, label: "단백질 위주의 아침식사", done: false },
    ],
  },
];

// 전체보기 시트용 (오전/오후/저녁/취침 전)
export const allTaskSections: TodoSection[] = [
  {
    period: "오전",
    items: [
      { id: 1, label: "림프 마사지 5분 하기", done: true },
      { id: 2, label: "수분 크림과 자외선 차단제 바르기", done: true },
      { id: 3, label: "단백질 위주의 아침식사", done: false },
    ],
  },
  {
    period: "오후",
    items: [
      { id: 4, label: "물 한잔 마시기", done: true },
      { id: 5, label: "자외선 차단제 덧바르기", done: true },
    ],
  },
  {
    period: "저녁",
    items: [{ id: 6, label: "근력 운동 20분하기", done: false }],
  },
  {
    period: "취침 전",
    items: [{ id: 7, label: "취침 전 스크린 오프하기", done: false }],
  },
];

// 위클리 달력
export interface CalendarDay {
  date: number;
  weekday: string;
}

export const weekDays: CalendarDay[] = [
  { date: 2, weekday: "일요일" },
  { date: 3, weekday: "월요일" },
  { date: 4, weekday: "화요일" },
  { date: 5, weekday: "수요일" },
  { date: 6, weekday: "목요일" },
  { date: 7, weekday: "금요일" },
  { date: 8, weekday: "토요일" },
];

export const selectedDate = 5;

export const menuItems = ["홈", "성취도", "정보수정"];

// 오늘의 방향 (동기부여)
export interface DirectionSection {
  period: string;
  icon: string;
  tips: string[];
}

export const todayDirection = {
  emoji: "😎",
  heading: "오늘은 자외선이 강한 날씨에요!",
  sub: "아침 보습과 자외선 차단에 신경 쓰는 것이 좋아요.",
  sections: [
    {
      period: "오전",
      icon: "☀️",
      tips: [
        "단백질 위주 식사로 근육 회복을 도와주세요.",
        "자외선이 최고조에 달하는 만큼 외출 전 자외선 차단제를 덧바르는 습관을 챙겨주세요.",
      ],
    },
    {
      period: "오후",
      icon: "🌅",
      tips: [
        "근력 운동은 저녁 7시 선호 시간대에 맞춰 배치했어요.",
        "운동 후에는 수분 섭취 알림을 통해 회복을 돕도록 구성했어요.",
      ],
    },
    {
      period: "밤",
      icon: "🌙",
      tips: ["스크린 타임을 줄여 피부 재생과 수면의 질을 함께 높여보세요."],
    },
  ] as DirectionSection[],
};
