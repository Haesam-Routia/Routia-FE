import { useState } from "react";

export default function CoachPage() {
  const [message, setMessage] = useState("");

  return (
    <div className="flex min-h-screen w-full justify-center bg-white">
      <div className="flex min-h-screen w-full max-w-[420px] flex-col bg-white">
        {/* 핑크 헤더 (h77 / rounded-b 12 / rgba(255,93,123,0.5) / 상단 25·좌측 26) */}
        <header className="flex h-[77px] items-start rounded-b-xl bg-buttonColor/50 pl-[26px] pt-[25px]">
          <h1 className="text-[22px] font-bold text-textColor">AI 코치</h1>
        </header>

        <main className="flex-1 px-[22px] pt-[30px]">
          <div className="flex h-[73px] w-[339px] max-w-full flex-col items-start rounded-xl bg-[#F1F1F1] px-3 py-[9px]" />
        </main>

        <div className="flex items-center gap-[14px] px-[22px] pb-[40px]">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="AI 코치에게 메시지 보내기..."
            className="h-[42px] flex-1 rounded-xl border border-lineColor bg-white px-3 text-sm text-textColor placeholder:text-subtextColor focus:outline-none"
          />
          <button
            type="button"
            className="flex h-[42px] w-[67px] shrink-0 items-center justify-center rounded-xl bg-buttonColor px-[14px] text-sm font-semibold text-white"
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
}