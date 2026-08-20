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
  if (!m) return null;

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return null;

  try {
    const token = await getToken(m, {
      vapidKey,
      serviceWorkerRegistration: await navigator.serviceWorker.register("/firebase-messaging-sw.js"),
    });
    return token || null;
  } catch (err) {
    console.warn("[Routia] FCM 토큰 획득 실패:", err);
    return null;
  }
}
