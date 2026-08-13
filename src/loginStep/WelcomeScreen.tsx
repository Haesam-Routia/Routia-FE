import React from "react";

interface WelcomeScreenProps {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
}

/**
 * 로고 이미지 경로(logo-icon.png)는 실제 자산 경로로 교체하세요.
 */
export default function WelcomeScreen({
  onLoginClick,
  onSignupClick,
}: WelcomeScreenProps) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-rose-100 via-pink-50 to-white px-6 py-12">
      <div className="flex w-full max-w-sm flex-col items-center">
        <img
          src="/assets/logo-icon.png"
          alt="Butla 로고"
          className="h-24 w-24 select-none object-contain"
          draggable={false}
        />
        <p
          className="mt-2 text-3xl text-neutral-900"
          style={{ fontFamily: "'Snell Roundhand', 'Segoe Script', cursive" }}
        >
          Butla
        </p>

        <div className="mt-10 text-center">
          <h1 className="text-2xl font-bold text-neutral-900">환영합니다!</h1>
          <p className="mt-2 text-sm text-neutral-500">
            AI 맞춤형 안티에이징 루틴을 시작해보세요
          </p>
        </div>

        <div className="mt-10 flex w-full flex-col gap-3">
          <button
            type="button"
            onClick={onLoginClick}
            className="w-full rounded-xl bg-neutral-900 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
          >
            로그인
          </button>

          <button
            type="button"
            onClick={onSignupClick}
            className="w-full rounded-xl border border-neutral-200 bg-white py-3.5 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
