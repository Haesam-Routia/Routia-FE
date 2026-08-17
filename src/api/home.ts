// 홈 / 오늘의 루틴 / 날씨 엔드포인트
import { requestData } from "./http";
import type {
  HomeResponse,
  TodayRoutinesResponse,
  ToggleTaskResponse,
  WeatherResponse,
} from "./types";

/** 홈 화면 조회. */
export function getHome(): Promise<HomeResponse> {
  return requestData<HomeResponse>("/api/v1/home", { method: "GET" });
}

/** 오늘 할 일 전체보기. */
export function getTodayRoutines(): Promise<TodayRoutinesResponse> {
  return requestData<TodayRoutinesResponse>("/api/v1/routines/today", { method: "GET" });
}

/** 할 일 체크박스 토글. 같은 항목 재호출 시 다시 해제. */
export function toggleTodayItem(itemId: number): Promise<ToggleTaskResponse> {
  return requestData<ToggleTaskResponse>(`/api/v1/routines/today/items/${itemId}`, {
    method: "PATCH",
  });
}

/** 오늘 날씨 & 자외선 정보. */
export function getTodayWeather(): Promise<WeatherResponse> {
  return requestData<WeatherResponse>("/api/v1/weather/today", { method: "GET" });
}
