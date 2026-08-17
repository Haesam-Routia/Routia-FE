import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Step3Difficulty() {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState("");
  const [timePref, setTimePref] = useState("");

  const difficultyOptions = [
    { value: "complex", label: "루틴이 복잡해도 괜찮아요", desc: "자세한 단계별 루틴 (12개 생성)", level: "Lv.3", emoji: "" },
    { value: "medium", label: "너무 복잡한 건 싫어요", desc: "핵심 단계만 간단하게 (6~7개 생성)", level: "Lv.2", emoji: "" },
    { value: "simple", label: "단순했으면 좋겠어요", desc: "최소한의 루틴만 (3개 생성)", level: "Lv.1", emoji: "" },
  ];

  const timeOptions = ["아침형", "저녁형", "상관없음"];

  return (
    <div className="relative flex w-full flex-col bg-white min-h-screen">
      {/* 상단 네비 */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-2 shrink-0">
        <button
          type="button"
          onClick={() => navigate(-1 as never)}
          className="w-8 h-8 flex items-center justify-center"
        >
          <svg className="w-5 h-5 text-textColor" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="flex-1 h-1 rounded-full bg-neutral-100 overflow-hidden">
          <div className="h-full w-3/4 rounded-full bg-buttonColor transition-all duration-500" />
        </div>
        <span className="text-xs font-medium text-subtextColor">3/4</span>
      </div>

      {/* 타이틀 */}
      <div className="px-6 pt-4 pb-2">
        <h1 className="text-[22px] font-bold text-textColor leading-snug">
          루틴 난이도를 설정해주세요
        </h1>
        <p className="mt-1.5 text-[13px] text-subtextColor">
          나에게 맞는 루틴 복잡도를 선택해주세요
        </p>
      </div>

      {/* 콘텐츠 */}
      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-[100px]">
        <div className="flex flex-col gap-7">
          {/* 루틴 난이도 */}
          <div>
            <p className="text-[13px] font-semibold text-textColor mb-2.5">
              루틴 난이도 <span className="text-buttonColor">*</span>
            </p>
            <div className="flex flex-col gap-2.5">
              {difficultyOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setDifficulty(opt.value)}
                  className={`w-full rounded-xl border px-4 py-3.5 text-left transition-all active:scale-[0.98] flex items-center gap-3 ${
                    difficulty === opt.value
                      ? "border-buttonColor bg-[#FFF1F3]"
                      : "border-neutral-200 bg-white"
                  }`}
                >
                  <span className={`shrink-0 text-[11px] font-bold px-2 py-0.5 rounded-md ${
                    difficulty === opt.value
                      ? "bg-buttonColor text-white"
                      : "bg-neutral-100 text-subtextColor"
                  }`}>
                    {opt.level}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[14px] font-semibold ${difficulty === opt.value ? "text-buttonColor" : "text-textColor"}`}>
                      {opt.label}
                    </p>
                    <p className={`mt-0.5 text-[12px] ${difficulty === opt.value ? "text-buttonColor/70" : "text-subtextColor"}`}>
                      {opt.desc}
                    </p>
                  </div>
                  <span className="shrink-0 text-sm">{opt.emoji}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 루틴 선호 시간대 */}
          <div>
            <p className="text-[13px] font-semibold text-textColor mb-2.5">
              선호 시간대 <span className="text-buttonColor">*</span>
            </p>
            <div className="flex gap-2">
              {timeOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setTimePref(opt)}
                  className={`h-10 flex-1 rounded-xl text-[13px] font-semibold transition-all active:scale-95 ${
                    timePref === opt
                      ? "bg-buttonColor text-white shadow-sm"
                      : "bg-neutral-50 text-subtextColor border border-neutral-200"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="absolute left-0 right-0 bottom-0 px-6 pb-8 pt-4 bg-gradient-to-t from-white via-white to-transparent">
        <button
          type="button"
          onClick={() => {
            console.log("3단계:", { difficulty, timePref });
            navigate("/onboarding");
          }}
          className="w-full h-14 bg-buttonColor rounded-xl flex justify-center items-center cursor-pointer hover:opacity-90 active:scale-[0.98] transition-all"
        >
          <span className="text-white text-base font-semibold">다음으로</span>
        </button>
      </div>
    </div>
  );
}
