import { type FormEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { inputClass, primaryBtnClass } from "../components/common";

export default function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isFilled = useMemo(
    () => Boolean(email.trim() && password.trim()),
    [email, password],
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isFilled) return;
    navigate("/login/complete");
  };

  return (
    <div className="flex min-h-screen w-full justify-center bg-gradient-to-b from-rose-100 via-pink-50 to-white px-6 pt-[165px]">
      <form
        onSubmit={handleSubmit}
        className="flex h-[315px] w-[362px] flex-col rounded-xl bg-white px-7 py-[17px] shadow-sm">
        <h1 className="mb-[50px] text-center text-base font-bold text-neutral-900">
          로그인
        </h1>

        <div className="flex flex-col gap-2.5">
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
          />
        </div>

        <button type="submit" disabled={!isFilled} className="mt-[50px] w-full rounded-xl bg-buttonColor py-3.5 text-sm font-semibold text-white">
          로그인
        </button>

        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-neutral-400">
          <button type="button" className="hover:underline">이메일 찾기</button>
          <span className="text-neutral-200">|</span>
          <button type="button" className="hover:underline">비밀번호 찾기</button>
        </div>
      </form>
    </div>
  );
}