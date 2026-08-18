import { history as mockHistory, type HistoryItem } from "../../data/score";

export default function HistoryCard({ data = mockHistory }: { data?: HistoryItem[] }) {
  const history = data;
  return (
    <div className="flex w-full flex-col gap-1.5 rounded-[18px] border border-lineColor bg-white px-4 py-[18px]">
      <p className="mb-1 text-[12.5px] font-normal text-[#424242]">과거 기록</p>
      {history.map((h) => (
        <div key={h.period} className="flex items-center justify-between">
          <span className="font-inter text-[11px] font-normal text-[#9D9D9D]">{h.period}</span>
          <span className="font-inter text-[11px] font-normal text-subtextColor">{h.desc}</span>
        </div>
      ))}
    </div>
  );
}
