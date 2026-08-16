// 성취도 및 변화분석 화면 목업 데이터 (백엔드 미정 → mock)

export interface WeeklyTrendItem {
  label: string; // 요일/날짜 (예: "수 7/30")
  value: number; // 수행률 (0~100)
}

export interface HistoryItem {
  period: string; // 기간 (예: "7/28 - 8/3")
  desc: string; // 요약
}

export const summary = {
  weeklyRate: 78, // 이번 주 수행률(%)
  vsLastWeek: 12, // 지난주 대비 상승(%)
  avgCompleted: 5.6, // 평균 완료 항목(개)
};

export const streak = {
  days: 7, // 연속 달성 일수
  achieved: 6, // 달성한 별 개수
  current: 7, // 현재(큰 별) 표시 숫자
  total: 18, // 전체 노드 수
};

export const weeklyTrend: WeeklyTrendItem[] = [
  { label: "수 7/30", value: 60 },
  { label: "목 7/31", value: 78 },
  { label: "금 8/1", value: 66 },
  { label: "토 8/2", value: 88 },
  { label: "일 8/3", value: 90 },
  { label: "월 8/4", value: 100 },
  { label: "화 8/5", value: 45 },
];

export const history: HistoryItem[] = [
  { period: "7/28 - 8/3", desc: "수행률 71% · 총 74개 중 54개 완료" },
  { period: "7/21 - 7/27", desc: "수행률 64% · 난이도 중" },
  { period: "7/14 - 7/20", desc: "수행률 58% · 난이도 하" },
];
