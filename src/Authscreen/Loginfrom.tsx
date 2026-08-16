import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { inputClass } from "../components/common";

async function requestLogin(email: string, password: string) {
  console.log("로그인 시도:", email, password);
}

/**
 * 로그인: 이메일 / 비밀번호 폼.
 * SignupForm과 동일한 inputClass, buttonColor 계열 클래스를 사용해
 * 탭 전환 시 톤이 이어지도록 맞췄습니다.
 */
export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFilled = useMemo(
    () => email.trim().length > 0 && password.trim().length > 0,
    [email, password],
  );

  const handleSubmit = async () => {
    if (!isFilled || isSubmitting) return;
    setError(null);
    setIsSubmitting(true);
    try {
      await requestLogin(email, password);
      navigate("/home");
    } catch {
      setError("이메일 또는 비밀번호가 일치하지 않습니다");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col mt-10">
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
        className={`${inputClass} mt-3`}
      />
      {error && <p className="text-xs mt-2 text-rose-500">{error}</p>}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={!isFilled || isSubmitting}
        className={`mt-6 flex h-12.5 w-full shrink-0 items-center justify-center rounded-[10px] text-sm font-semibold text-white ${
          isFilled && !isSubmitting ? "bg-buttonColor" : "bg-buttonPressedColor opacity-50"
        }`}
      >
        {isSubmitting ? "로그인 중..." : "로그인"}
      </button>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-buttonPressedColor">
        <button type="button" onClick={() => navigate("/find-email")} className="underline">
          이메일 찾기
        </button>
        <span>|</span>
        <button type="button" onClick={() => navigate("/find-password")} className="underline">
          비밀번호 찾기
        </button>
      </div>
    </div>
  );
}
