// 인터랙티브 프로토타입용 헬퍼.
// 백엔드가 아직 떠 있지 않을 수 있으므로, "네트워크 자체가 실패"한 경우와
// "서버가 정상적으로 오류 코드를 응답"한 경우를 구분한다.
//  - 네트워크 실패(연결 불가/CORS 등): UI 흐름을 막지 않고 데모용으로 넘어간다.
//  - 서버 오류 응답(400/401/409 등): 실제 검증 오류이므로 사용자에게 보여준다.
import { ApiError } from "./http";

/** fetch 자체가 던진(=서버 응답 없음) 네트워크 오류인지 여부. */
export function isNetworkError(err: unknown): boolean {
  if (err instanceof ApiError) {
    // toApiError 가 HTTP_<status> 로 만든 건 응답이 있었던 경우.
    return err.code.startsWith("HTTP_") && err.status === 0;
  }
  // fetch 실패는 보통 TypeError("Failed to fetch")
  return err instanceof TypeError;
}

/**
 * API 를 시도하되, 백엔드 미가동(네트워크 실패) 시에는 fallback 값으로 조용히 대체한다.
 * 서버가 실제 오류 코드를 응답한 경우(ApiError with status>0)는 그대로 다시 던진다.
 */
export async function tryApi<T>(run: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await run();
  } catch (err) {
    if (err instanceof ApiError && err.status > 0) throw err; // 진짜 서버 오류
    if (import.meta && (import.meta as unknown as { env?: { DEV?: boolean } }).env?.DEV) {
      console.warn("[Routia] 백엔드 미가동 — 데모 모드로 대체:", (err as Error)?.message);
    }
    return fallback;
  }
}
