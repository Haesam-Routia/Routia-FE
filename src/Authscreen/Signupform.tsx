import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { inputClass } from "../components/common";
import checkImg from "../assets/routia-check-pink.svg";

async function requestEmailCode(email: string) {
  console.log("인증번호 발송:", email);
}
async function verifyEmailCode(code: string) {
  return code.trim().length >= 4;
}

/**
 * 회원가입: 이름 / 이메일 인증 폼.
 * 기존 VerifyScreen 안에 있던 로직·JSX를 그대로 옮긴 것뿐이라
 * 동작은 이전과 동일합니다.
 */
export default function SignupForm() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  // 인증 타이머
  useEffect(() => {
    if (!isCodeSent || secondsLeft <= 0) return;
    const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [isCodeSent, secondsLeft]);

  const mmss = `${String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:${String(
    secondsLeft % 60,
  ).padStart(2, "0")}`;

  const handleSend = async () => {
    if (!email.trim()) return;
    await requestEmailCode(email);
    setIsCodeSent(true);
    setSecondsLeft(299); // 04:59
    setError(null);
  };

  const handleVerify = async () => {
    if (await verifyEmailCode(code)) setShowModal(true);
    else setError("인증번호가 일치하지 않습니다");
  };

  return (
    <>
      <div className="flex flex-col mt-10">
        <input
          type="text"
          placeholder="이름"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className={inputClass}
        />
        <p className="text-xs text-buttonPressedColor mt-2">성을 포함하여 입력해주세요.</p>

        <div className="flex gap-2 mt-6 mb-2">
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`${inputClass} flex-1`}
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!email.trim()}
            className={`flex h-12.5 w-[95px] shrink-0 items-center justify-center whitespace-nowrap rounded-[10px] text-xs font-semibold text-white ${
              isCodeSent ? "bg-buttonPressedColor" : "bg-buttonColor"
            }`}
          >
            {isCodeSent ? "인증번호 받기" : "인증번호 받기"}
          </button>
        </div>

        {isCodeSent && (
          <div className="flex flex-col">
            <p className="text-xs text-buttonPressedColor mb-6">
              이메일로 인증번호를 보냈습니다. 입력해주세요.
            </p>

            <div className="flex gap-2 mb-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="인증번호"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className={`${inputClass} pr-14`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-buttonColor">
                  {mmss}
                </span>
              </div>
              <button
                type="button"
                onClick={handleVerify}
                className={`flex h-12.5 w-[95px] shrink-0 items-center justify-center whitespace-nowrap rounded-[10px] text-xs font-semibold text-white ${
                  showModal ? "bg-buttonPressedColor" : "bg-buttonColor"
                }`}
              >
                인증하기
              </button>
            </div>

            <p className="text-xs text-buttonPressedColor">
              인증번호가 오지 않나요?{" "}
              <button
                type="button"
                onClick={handleSend}
                className="text-buttonPressedColor underline"
              >
                재전송
              </button>
            </p>
            {error && <p className="text-xs mt-4 text-rose-500">{error}</p>}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/20 px-6 backdrop-blur-sm">
          <div className="flex h-[284px] w-[282px] flex-col items-center justify-center rounded-xl bg-white px-6 text-center shadow-lg">
            <img src={checkImg} alt="완료" className="h-[68px] w-[68px]" />
            <p className="mt-4 text-sm font-semibold text-neutral-900">인증이 완료되었습니다!</p>
            <p className="mt-1 text-xs text-neutral-500">회원가입을 이어서 진행해주세요.</p>
            <button
              type="button"
              onClick={() => navigate("/signup/password", { state: { nickname, email } })}
              className="mt-6 h-[50px] w-[202px] rounded-xl bg-buttonColor px-4 py-3.5 text-sm font-semibold text-white"
            >
              회원가입으로 돌아가기
            </button>
          </div>
        </div>
      )}
    </>
  );
}
