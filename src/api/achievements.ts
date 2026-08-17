// 성취도 엔드포인트 (/api/v1/achievements/*)
import { requestData } from "./http";
import type { AchievementHistory, AchievementSummary, WeeklyTrend } from "./types";

/** 성취도 및 변화 분석 (이번 주 수행률/증감/평균/스트릭). */
export function getAchievementSummary(): Promise<AchievementSummary> {
  return requestData<AchievementSummary>("/api/v1/achievements/summary", { method: "GET" });
}

/** 과거 기록 (지난 3주). */
export function getAchievementHistory(): Promise<AchievementHistory> {
  return requestData<AchievementHistory>("/api/v1/achievements/history", { method: "GET" });
}

/** 주간 수행 추이 (이번 주 월~일 완료 개수). */
export function getWeeklyTrend(): Promise<WeeklyTrend> {
  return requestData<WeeklyTrend>("/api/v1/achievements/weekly-trend", { method: "GET" });
}
