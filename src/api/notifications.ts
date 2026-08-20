// 알림 설정 엔드포인트 (/api/v1/users/{id}/notification-settings)
import { requestData } from "./http";

export type NotificationSettings = {
  notificationEnabled: boolean;
  notificationTime: string | null; // "HH:mm"
};

export function getNotificationSettings(userId: number): Promise<NotificationSettings> {
  return requestData<NotificationSettings>(`/api/v1/users/${userId}/notification-settings`, {
    method: "GET",
  });
}

/** 알림 ON 시 notificationTime("HH:mm") 필수, OFF 시 null. */
export function updateNotificationSettings(
  userId: number,
  body: NotificationSettings,
): Promise<NotificationSettings> {
  return requestData<NotificationSettings>(`/api/v1/users/${userId}/notification-settings`, {
    method: "PATCH",
    body,
  });
}

// ---- Web Push 기기 등록/비활성화 ------------------------------------------------

export type PushDeviceResponse = {
  id: number;
  platform: string;
  active: boolean;
  lastSeenAt: string;
};

/** Web Push 기기 등록. Firebase Installation ID를 서버에 전달. */
export function registerPushDevice(
  userId: number,
  body: { installationId: string; platform: "WEB" },
): Promise<PushDeviceResponse> {
  return requestData<PushDeviceResponse>(`/api/v1/users/${userId}/push-devices`, {
    method: "POST",
    body,
  });
}

/** Web Push 기기 비활성화. */
export function deactivatePushDevice(
  userId: number,
  deviceId: number,
): Promise<PushDeviceResponse> {
  return requestData<PushDeviceResponse>(`/api/v1/users/${userId}/push-devices/${deviceId}`, {
    method: "DELETE",
  });
}
