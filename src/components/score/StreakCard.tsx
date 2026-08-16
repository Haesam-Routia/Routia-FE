import { streak } from "../../data/score";
import StreakBoard from "./StreakBoard";
import fire from "../../assets/routia-fire.svg";

export default function StreakCard() {
  return (
    <div className="h-[267px] w-full rounded-[18px] border border-lineColor bg-white pl-[15px] pr-4 pt-3">
      <p className="text-[11px] font-normal text-[#424242]">연속 달성</p>
      <p className="mt-1 flex items-center gap-1 text-[18px] font-semibold text-textColor">
        {streak.days}일
        <img src={fire} alt="" className="h-5 w-5" />
      </p>

      <div className="mt-2">
        <StreakBoard current={streak.current} />
      </div>
    </div>
  );
}
