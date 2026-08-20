// Firebase 초기화 및 Messaging 인스턴스 제공.
// 환경변수(VITE_FIREBASE_*)로 설정값을 주입하세요.
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, type Messaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? "",
};

const app = initializeApp(firebaseConfig);

let messaging: Messaging | null = null;

/** Messaging 인스턴스 (브라우저 환경에서만 사용 가능) */
export function getFirebaseMessaging(): Messaging | null {
  if (typeof window === "undefined" || !("Notification" in window)) return null;
  if (!messaging) messaging = getMessaging(app);
  return messaging;
}

/** FCM 토큰(Installation ID) 획득. 브라우저 알림 권한 요청 포함. */
export async function requestFcmToken(vapidKey: string): Promise<string | null> {
  const m = getFirebaseMessaging();
  if (!m) {
    console.warn("[Routia] Messaging 인스턴스 생성 불가 (브라우저 미지원)");
    return null;
  }

  try {
    const permission = await Notification.requestPermission();
    console.log("[Routia] 알림 권한 상태:", permission);
    if (permission !== "granted") return null;
  } catch (err) {
    console.error("[Routia] 알림 권한 요청 실패:", err);
    return null;
  }

  try {
    const sw = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
    console.log("[Routia] Service Worker 등록 성공");
    const token = await getToken(m, { vapidKey, serviceWorkerRegistration: sw });
    console.log("[Routia] FCM 토큰 획득:", token ? token.slice(0, 20) + "..." : "null");
    return token || null;
  } catch (err) {
    console.error("[Routia] FCM 토큰 획득 실패:", err);
    return null;
  }
}
