import { useEffect, useState } from "react";
import { weeklyTrend as mockTrend, type WeeklyTrendItem } from "../../data/score";

export default function WeeklyTrendCard({ data = mockTrend }: { data?: WeeklyTrendItem[] }) {
  const weeklyTrend = data;
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // 마운트 직후 한 프레임 뒤에 애니메이션 시작
    const id = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="h-[144px] w-full rounded-[18px] border border-lineColor bg-white px-[15px] pt-3 pb-4">
      <p className="text-[11px] font-normal text-[#424242]">주간 수행 추이</p>

      <div className="mt-3 flex justify-center gap-[6px]">
        {weeklyTrend.map((d, i) => (
          <div key={d.label} className="flex w-[26px] flex-col items-center">
            <div className="flex h-[60px] w-[26px] items-end">
              <div
                className="w-[26px] rounded-[3px] bg-buttonColor transition-all ease-out"
                style={{
                  height: animate ? `${(d.value / 100) * 60}px` : "0px",
                  transitionDuration: `${400 + i * 80}ms`,
                }}
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
