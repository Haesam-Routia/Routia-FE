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
