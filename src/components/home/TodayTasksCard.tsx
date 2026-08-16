import { useState } from "react";
import { allTaskSections, progress } from "../../data/home";
import TaskCheckItem from "./TaskCheckItem";

interface TodayTasksCardProps {
  guide: string;
}

export default function TodayTasksCard({ guide }: TodayTasksCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setExpanded(!expanded)}
      className="relative w-full overflow-hidden rounded-2xl border border-[#FFB5BF] bg-gradient-to-br from-[#FFF0F2] via-[#FFDCE2] to-[#FFC4D0] px-7 py-5 text-left shadow-[0_8px_24px_-6px_rgba(255,93,123,0.3),inset_0_1px_2px_rgba(255,255,255,0.8)]"
    >
      {/* shimmer — 전체 카드에 걸림 */}
      <div className="pointer-events-none absolute inset-0 animate-[shimmer_5s_ease-in-out_infinite] bg-[length:200%_100%] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      {/* TODAY 배지 */}
      <div className="mb-2">
        <span className="inline-block rounded-full bg-buttonColor px-3 py-0.5 text-[10px] font-bold tracking-wide text-white">
          TODAY
        </span>
      </div>

      {/* 제목 + 완료 현황 */}
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-bold text-[#f14867]">
          🔥 오늘 할 일
        </h2>
        <span className="text-xs font-semibold text-subtextColor">
          <span className="text-[#FF1C46]">{progress.done}</span>/{progress.total} 완료
        </span>
      </div>

      {/* 서브텍스트 */}
      <p className="mt-1 whitespace-pre-line text-xs text-subtextColor">{guide}</p>

      {/* 체크 목록 (펼침/접힘) */}
      <div
        className={`overflow-hidden transition-all duration-400 ease-out ${
          expanded ? "max-h-[800px] opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
        }`}
      >
        {allTaskSections.map((section) => (
          <div key={section.period} className="mt-4 first:mt-0">
            <p className="mb-3 text-[13px] font-bold text-[#FF5D7B]">{section.period}</p>
            <ul className="flex flex-col gap-3">
              {section.items.map((item) => (
                <TaskCheckItem key={item.id} label={item.label} done={item.done} />
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* 펼침 화살표 */}
      <div className="mt-3 flex justify-center">
        <svg
          className={`w-5 h-5 text-[#FF5D7B] transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </button>
  );
}
