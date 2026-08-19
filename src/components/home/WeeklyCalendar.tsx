import { useEffect, useState } from "react";
import cancelIcon from "../../assets/routia-cancellation.svg";

interface WeeklyCalendarProps {
  /** 현재 선택된 날짜 (ISO: "2026-08-13") */
  selectedDate?: string;
  onClose?: () => void;
  onSelectDay?: (isoDate: string) => void;
}

interface CalendarDay {
  iso: string; // "2026-08-13"
  date: number; // 13
  weekday: string; // "수요일"
}

const WEEKDAY_NAMES = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

/** 주어진 날짜가 속한 주(일~토)의 날짜 배열을 생성 */
function getWeekDays(baseDate: string): CalendarDay[] {
  const d = new Date(`${baseDate}T00:00:00`);
  const dayOfWeek = d.getDay(); // 0=일, 1=월, ..., 6=토
  const sunday = new Date(d);
  sunday.setDate(d.getDate() - dayOfWeek);

  const days: CalendarDay[] = [];
  for (let i = 0; i < 7; i++) {
    const current = new Date(sunday);
    current.setDate(sunday.getDate() + i);
    const iso = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, "0")}-${String(current.getDate()).padStart(2, "0")}`;
    days.push({
      iso,
      date: current.getDate(),
      weekday: WEEKDAY_NAMES[current.getDay()],
    });
  }
  return days;
}

export default function WeeklyCalendar({ selectedDate, onClose, onSelectDay }: WeeklyCalendarProps) {
  const [visible, setVisible] = useState(false);

  // 선택된 날짜 없으면 오늘 기준
  const today = new Date();
  const todayIso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const baseDate = selectedDate || todayIso;
  const weekDays = getWeekDays(baseDate);

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
            const isSelected = day.iso === baseDate;
            return (
              <div key={day.iso} className="flex flex-1 justify-center">
                <button
                  type="button"
                  onClick={() => {
                    onSelectDay?.(day.iso);
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
