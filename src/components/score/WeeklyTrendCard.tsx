import { weeklyTrend as mockTrend, type WeeklyTrendItem } from "../../data/score";

export default function WeeklyTrendCard({ data = mockTrend }: { data?: WeeklyTrendItem[] }) {
  const weeklyTrend = data;
  return (
    <div className="h-[144px] w-full rounded-[18px] border border-lineColor bg-white px-[15px] pt-3 pb-4">
      <p className="text-[11px] font-normal text-[#424242]">주간 수행 추이</p>

      <div className="mt-3 flex justify-center gap-[6px]">
        {weeklyTrend.map((d) => (
          <div key={d.label} className="flex w-[26px] flex-col items-center">
            <div className="flex h-[60px] w-[26px] items-end">
              <div
                className="w-[26px] rounded-[3px] bg-buttonColor"
                style={{ height: `${(d.value / 100) * 60}px` }}
              />
            </div>
            <span className="mt-1.5 whitespace-nowrap font-inter text-[7.5px] font-normal text-subtextColor">
              {d.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
