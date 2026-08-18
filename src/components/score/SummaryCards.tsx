import { summary as mockSummary } from "../../data/score";

const boxClass =
  "flex h-[63px] flex-1 flex-col justify-center rounded-[18px] border border-lineColor bg-white pl-[15px] pr-4";

type SummaryData = { weeklyRate: number; vsLastWeek: number; avgCompleted: number };

export default function SummaryCards({ data = mockSummary }: { data?: SummaryData }) {
  const summary = data;
  return (
    <div className="flex gap-2.5">
      <div className={boxClass}>
        <p className="text-[11px] font-normal text-[#424242]">이번 주 수행률</p>
        <div className="mt-0.5 flex items-baseline gap-1.5">
          <span className="text-[18px] font-semibold text-textColor">{summary.weeklyRate}%</span>
          <span className="whitespace-nowrap text-[11px] font-medium text-buttonColor">
            지난주보다 {Math.abs(summary.vsLastWeek)}% {summary.vsLastWeek < 0 ? "하락" : "상승"}!
          </span>
        </div>
      </div>

      <div className={boxClass}>
        <p className="text-[11px] font-normal text-[#424242]">평균 완료 항목</p>
        <span className="mt-0.5 text-[18px] font-semibold text-textColor">
          {summary.avgCompleted}개
        </span>
      </div>
    </div>
  );
}
