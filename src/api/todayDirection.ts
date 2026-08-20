import api from "./client";

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

export interface TodayDirectionResponse {
  success: boolean;
  data: TodayDirectionData;
  message: string;
}

// --- API 호출 ---

export const getTodayDirection = async (): Promise<TodayDirectionData> => {
  const response = await api.get<TodayDirectionResponse>(
    "/api/v1/home/today-direction"
  );
  return response.data.data;
};
