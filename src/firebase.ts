// Firebase 초기화 및 Messaging 인스턴스 제공.
// 환경변수(VITE_FIREBASE_*)로 설정값을 주입하세요.
import { initializeApp } from "firebase/app";
import { getMessaging, onRegistered, register, type Messaging } from "firebase/messaging";

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

/**
 * register() 호출 후 onRegistered() 콜백으로 전달되는
 * Firebase Installation ID(FID)를 기다려 반환한다. (백엔드는 registration token이 아닌 FID 사용)
 */
function waitForFid(
  m: Messaging,
  serviceWorkerRegistration: ServiceWorkerRegistration,
  vapidKey: string,
): Promise<string> {
  return new Promise((resolve, reject) => {
    let unsubscribe = () => {};
    const timeout = window.setTimeout(() => {
      unsubscribe();
      reject(new Error("FCM 기기 등록 시간이 초과되었습니다."));
    }, 15000);

    // register()보다 listener를 먼저 연결해야 함
    unsubscribe = onRegistered(m, (fid) => {
      window.clearTimeout(timeout);
      unsubscribe();
      resolve(fid);
    });

    register(m, { vapidKey, serviceWorkerRegistration }).catch((error) => {
      window.clearTimeout(timeout);
      unsubscribe();
      reject(error);
    });
  });
}

/**
 * 알림 권한 요청 → Service Worker 등록 → register()/onRegistered()로 FID 획득.
 * 실패 시 사유와 함께 throw 하므로 호출부에서 성공 여부를 판별할 수 있다.
 */
export async function requestFcmFid(vapidKey: string): Promise<string> {
  const m = getFirebaseMessaging();
  if (!m) throw new Error("이 브라우저는 웹 푸시를 지원하지 않습니다.");
  if (!vapidKey) throw new Error("푸시 설정(VAPID 키)이 누락되었습니다.");

  const permission = await Notification.requestPermission();
  if (permission !== "granted") throw new Error("브라우저 알림 권한이 필요합니다.");

  const serviceWorkerRegistration = await navigator.serviceWorker.register(
    "/firebase-messaging-sw.js",
    { scope: "/" },
  );

  return waitForFid(m, serviceWorkerRegistration, vapidKey);
}
