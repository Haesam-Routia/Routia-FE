import { type FormEvent, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AgreeItem, inputClass } from "../components/common";
import eyeImg from "../assets/routia-verify-eye.svg";
import LogoText from "../assets/routia-text-img.svg";

export default function SignupScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { nickname = "", email = "" } =
    (location.state as { nickname?: string; email?: string }) ?? {};

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showPwConfirm, setShowPwConfirm] = useState(false);
  const [agree, setAgree] = useState({ terms: false, marketing: false });

  // 비밀번호: 영문 대문자 + 숫자 + 특수문자 + 10자 이상
  const pwValid = useMemo(
    () =>
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^a-zA-Z0-9]/.test(password),
    [password],
  );
  const pwMatch = passwordConfirm.length > 0 && password === passwordConfirm;
  const canSubmit = pwValid && pwMatch && agree.terms;

  const allChecked = agree.terms && agree.marketing;
  const toggleAll = (v: boolean) => setAgree({ terms: v, marketing: v });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    navigate("/signup/complete");
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-white px-6 pb-12 pt-[86px]">
      <form onSubmit={handleSubmit} className="flex h-fit w-full flex-col">
        <div className="flex h-fit w-full flex-col rounded-xl bg-white px-2 py-[17px]">
          <img src={LogoText} alt="로고" className="h-15 mb-10" />

          <div className="flex flex-col gap-2.5">
            <input
              type="text"
              value={nickname}
              readOnly
              className={`${inputClass} bg-neutral-100`}
            />
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                readOnly
                className={`${inputClass} flex-1 bg-neutral-100`}
              />
              <button
                type="button"
                disabled
                className="flex h-12.5 w-[95px] shrink-0 items-center justify-center whitespace-nowrap rounded-[10px] bg-buttonPressedColor text-xs font-semibold text-white"
              >
                인증 완료
              </button>
            </div>

            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                placeholder="비밀번호 (영문 대문자+숫자+특수문자 8자이상)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${inputClass} pr-10 `}
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <img
                  src={eyeImg}
                  alt="비밀번호 표시"
                  className={`h-5 w-5 ${showPw ? "" : "opacity-40"}`}
                />
              </button>
            </div>

            <div className="relative">
              <input
                type={showPwConfirm ? "text" : "password"}
                placeholder="비밀번호 확인"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className={`${inputClass} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPwConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <img
                  src={eyeImg}
                  alt="비밀번호 표시"
                  className={`h-5 w-5 ${showPwConfirm ? "" : "opacity-40"}`}
                />
              </button>
            </div>

            {passwordConfirm.length > 0 && (
              <p
                className={`text-xs ${pwMatch ? "text-emerald-500" : "text-rose-500"}`}
              >
                {pwMatch
                  ? "비밀번호가 일치합니다"
                  : "비밀번호가 일치하지 않습니다"}
              </p>
            )}

            <hr className="my-1 border-neutral-100" />

            <div className="flex flex-col gap-2">
              <AgreeItem checked={allChecked} onChange={toggleAll}>
                서비스 이용약관 전체 동의
              </AgreeItem>

              <hr className="border-[#DDDDDD]" />

              <AgreeItem
                checked={agree.terms}
                onChange={(v) => setAgree((a) => ({ ...a, terms: v }))}
              >
                [필수] 이용약관 및 개인정보처리방침
              </AgreeItem>

              <AgreeItem
                checked={agree.marketing}
                onChange={(v) => setAgree((a) => ({ ...a, marketing: v }))}
              >
                [선택] 마케팅 정보 수집 및 수신 동의
              </AgreeItem>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className={`mt-[50px] w-full rounded-xl py-3.5 text-sm font-semibold transition-colors ${
            !canSubmit
              ? "bg-buttonPressedColor text-white cursor-not-allowed" // 비활성화 스타일
              : "bg-buttonColor text-white cursor-pointer hover:opacity-90" // 활성화 스타일
          }`}
        >
          {!canSubmit ? "비밀번호를 확인해주세요" : "가입하기"}
        </button>
      </form>
    </div>
  );
}
