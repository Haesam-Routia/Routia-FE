// 오늘의 방향 (홈) 엔드포인트
import { requestData } from "./http";

// --- 타입 정의 ---

export type DirectionPeriod = "MORNING" | "AFTERNOON" | "NIGHT";

export type RoutineTimeSlot = "MORNING" | "AFTERNOON" | "EVENING" | "BEDTIME";

export interface TodayDirectionItem {
  itemId: number;
  timeSlot: RoutineTimeSlot;
  title: string;
  detail: string | null;
}

export interface TodayDirectionSection {
  period: DirectionPeriod;
  label: string;
  icon: string;
  items: TodayDirectionItem[];
}

export interface TodayDirectionData {
  routineId: number;
  date: string;
  emoji: string;
  title: string;
  description: string;
  sections: TodayDirectionSection[];
}

// --- API 호출 ---

/** 오늘의 방향 조회. (봉투/JWT/오류 정규화는 requestData 가 처리) */
export function getTodayDirection(): Promise<TodayDirectionData> {
  return requestData<TodayDirectionData>("/api/v1/home/today-direction", { method: "GET" });
}
