import { useEffect, useState } from "react";
import { weekDays, selectedDate } from "../../data/home";
import cancelIcon from "../../assets/routia-cancellation.svg";

interface WeeklyCalendarProps {
  onClose?: () => void;
  onSelectDay?: (date: number) => void;
}

export default function WeeklyCalendar({ onClose, onSelectDay }: WeeklyCalendarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => onClose?.(), 300);
  };

  return (
    <div className="absolute inset-0 z-30">
      {/* 스크림 */}
      <button
        type="button"
        aria-label="닫기"
        onClick={handleClose}
        className={`absolute inset-0 bg-black/10 transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* 달력 패널: 위에서 슬라이드 다운 */}
      <div
        className={`relative h-[181px] w-full rounded-b-xl border border-lineColor bg-white px-4 pt-4 shadow-[0_6px_30px_0_rgba(99,99,99,0.3)] transition-transform duration-300 ease-out ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* 헤더 */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[16px] font-normal text-textColor">위클리달력</h3>
          <button type="button" aria-label="닫기" onClick={handleClose} className="p-1">
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
                  onClick={() => {
                    onSelectDay?.(day.date);
                    handleClose();
                  }}
                  className={
                    isSelected
                      ? "flex h-[70px] w-[51px] flex-col items-center justify-center gap-1.5 rounded-xl bg-editbuttonColor"
                      : "flex flex-col items-center justify-center gap-1.5"
                  }
                >
                  <span
                    className={`text-center text-[26px] ${
                      isSelected ? "font-medium text-[#FF3B60]" : "font-normal text-[#424242]"
                    }`}
                  >
                    {day.date}
                  </span>
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
    </div>
  );
}
