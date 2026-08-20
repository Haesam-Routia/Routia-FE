// Firebase Cloud Messaging Service Worker.
// 백그라운드 푸시 수신 시 브라우저 알림을 표시합니다.
/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || "Routia";
  const options = {
    body: payload.notification?.body || "오늘의 루틴을 확인해보세요!",
    icon: "/routia-logo-black-1.svg",
  };
  self.registration.showNotification(title, options);
});
