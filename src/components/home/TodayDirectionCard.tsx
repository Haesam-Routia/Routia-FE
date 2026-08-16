import { todayDirection } from "../../data/home";
import sunglassesFace from "../../assets/routia-Sunglasses-face.svg";
import morning from "../../assets/routia-morning.svg";
import afternoon from "../../assets/routia-afternoon.svg";
import moon from "../../assets/routia-moon.svg";

const sectionIcon: Record<string, string> = {
  오전: morning,
  오후: afternoon,
  밤: moon,
};

interface TodayDirectionCardProps {
  onClose?: () => void;
}

export default function TodayDirectionCard({ onClose }: TodayDirectionCardProps) {
  const d = todayDirection;
  return (
    <div className="absolute left-1/2 top-[30px] z-30 flex h-[656px] w-[362px] -translate-x-1/2 flex-col rounded-xl border border-lineColor bg-white pb-[28px] pt-[21px]">
      <div className="pl-5 pr-[15px]">
        <p className="text-[16px] font-medium text-textColor">오늘의 방향</p>

        <div className="mt-6 flex justify-center">
          <img src={sunglassesFace} alt="" className="h-[117px] w-[117px]" />
        </div>

        <h2 className="mt-4 text-center text-lg font-bold text-textColor">{d.heading}</h2>
        <p className="mt-2 text-center text-[13px] text-subtextColor">{d.sub}</p>

        <div className="mt-6 flex flex-col gap-[42px]">
          {d.sections.map((s) => (
            <div key={s.period} className="flex gap-3">
              <div className="flex w-9 shrink-0 flex-col items-center gap-1 pt-0.5">
                <img src={sectionIcon[s.period]} alt="" className="h-8 w-auto" />
                <span className="text-[11px] text-subtextColor">{s.period}</span>
              </div>
              <ul className="flex flex-1 flex-col gap-1.5 pt-1">
                {s.tips.map((t, i) => (
                  <li key={i} className="flex gap-1 text-[12px] leading-snug text-textColor">
                    <span>•</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="mx-auto mt-auto flex h-[50px] w-[202px] items-center justify-center rounded-xl bg-buttonColor px-4 py-3.5 text-sm font-semibold text-white"
      >
        닫기
      </button>
    </div>
  );
}