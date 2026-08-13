import React, { useMemo, useState } from "react";

interface LoginScreenProps {
  onSubmit?: (email: string, password: string) => Promise<void> | void;
  onFindEmail?: () => void;
  onFindPassword?: () => void;
}

export default function LoginScreen({
  onSubmit,
  onFindEmail,
  onFindPassword,
}: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFilled = useMemo(
    () => email.trim().length > 0 && password.trim().length > 0,
    [email, password],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFilled || isSubmitting) return;

    setError(null);
    setIsSubmitting(true);
    try {
      await onSubmit?.(email, password);
    } catch (err) {
      // 서버 응답 메시지를 그대로 노출하고 싶다면 err를 파싱해서 대체하세요
      setError("이메일 또는 비밀번호가 일치하지 않습니다");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-rose-100 via-pink-50 to-white px-6 py-12">
      <div className="flex w-full max-w-sm flex-col items-center">
        <img
          src="/assets/logo-icon.png"
          alt="Butla 로고"
          className="h-14 w-14 select-none object-contain"
          draggable={false}
        />

        <div className="mt-8 w-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-100 sm:p-8">
          <h1 className="text-center text-lg font-bold text-neutral-900">
            로그인
          </h1>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
            <div>
              <label htmlFor="email" className="sr-only">
                이메일
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/10"
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="sr-only">
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full rounded-lg border bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus-visible:ring-2 ${
                  error
                    ? "border-rose-300 focus:border-rose-400 focus-visible:ring-rose-200"
                    : "border-neutral-200 focus:border-neutral-400 focus-visible:ring-neutral-900/10"
                }`}
              />

              {/* 비밀번호 불일치 등 인라인 에러 말풍선 */}
              {error && (
                <div className="absolute left-0 top-full z-10 mt-2 w-full rounded-lg bg-neutral-900 px-3 py-2 text-xs text-white shadow-lg">
                  <span className="absolute -top-1.5 left-6 h-3 w-3 rotate-45 bg-neutral-900" />
                  {error}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={!isFilled || isSubmitting}
              className={`mt-2 w-full rounded-lg py-3.5 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                isFilled && !isSubmitting
                  ? "bg-neutral-900 text-white hover:bg-neutral-800 focus-visible:ring-neutral-900"
                  : "cursor-not-allowed bg-neutral-200 text-neutral-400"
              }`}
            >
              {isSubmitting ? "로그인 중..." : "로그인"}
            </button>
          </form>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-neutral-400">
            <button
              type="button"
              onClick={onFindEmail}
              className="hover:text-neutral-600 hover:underline"
            >
              이메일 찾기
            </button>
            <span className="text-neutral-200">|</span>
            <button
              type="button"
              onClick={onFindPassword}
              className="hover:text-neutral-600 hover:underline"
            >
              비밀번호 찾기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
