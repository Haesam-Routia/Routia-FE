// Firebase Cloud Messaging Service Worker.
// 백그라운드 푸시 수신 시 브라우저 알림을 표시합니다.
/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyB0g9U4H0CqYR8DAix57SB9UyzBx30QRjw",
  authDomain: "routia-1a1d9.firebaseapp.com",
  projectId: "routia-1a1d9",
  storageBucket: "routia-1a1d9.firebasestorage.app",
  messagingSenderId: "733435639582",
  appId: "1:733435639582:web:21ab1ac368d30d907c3b0f",
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
