import { weekDays, selectedDate } from "../../data/home";
import cancelIcon from "../../assets/routia-cancellation.svg";

interface WeeklyCalendarProps {
  onClose?: () => void;
  onSelectDay?: (date: number) => void;
}

// 위클리 달력 (상단에서 펼쳐지는 패널)
// width 402 / height 181 / radius 0 0 12 12 / border 1px #DDD / bg #FFF / shadow
export default function WeeklyCalendar({ onClose, onSelectDay }: WeeklyCalendarProps) {
  return (
    <div className="h-[181px] w-full rounded-b-xl border border-lineColor bg-white px-4 pt-4 font-inter shadow-[0_6px_30px_0_rgba(99,99,99,0.5)]">
      {/* 헤더: 위클리달력 16px/400 #252525, 우측 X (cancellation) */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[16px] font-normal text-textColor">위클리달력</h3>
        <button type="button" aria-label="닫기" onClick={onClose} className="p-1">
          <img src={cancelIcon} alt="닫기" className="h-[19px] w-[19px]" />
        </button>
      </div>

      {/* 주간 날짜 */}
      <div className="flex items-center">
        {weekDays.map((day) => {
          const isSelected = day.date === selectedDate;
          return (
            <div key={day.date} className="flex flex-1 justify-center">
              <button
                type="button"
                onClick={() => onSelectDay?.(day.date)}
                className={
                  isSelected
                    ? "flex h-[70px] w-[51px] flex-col items-center justify-center gap-1.5 rounded-xl bg-editbuttonColor"
                    : "flex flex-col items-center justify-center gap-1.5"
                }
              >
                {/* 날짜 숫자: 26px, 기본 400/#424242, 선택 500/#FF3B60 */}
                <span
                  className={`text-center text-[26px] ${
                    isSelected ? "font-medium text-[#FF3B60]" : "font-normal text-[#424242]"
                  }`}
                >
                  {day.date}
                </span>
                {/* 요일: 14px, 기본 400/#424242, 선택 500/#FF3B60 */}
                <span
                  className={`text-[14px] ${
                    isSelected ? "font-medium text-[#FF3B60]" : "font-normal text-[#424242]"
                  }`}
                >
                  {day.weekday}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
