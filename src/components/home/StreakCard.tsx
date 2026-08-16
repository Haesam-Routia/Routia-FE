export interface StreakDay {
  label: string;
  completed: boolean;
  isToday?: boolean;
}

const streakDays = 7;
const week: StreakDay[] = [
  { label: "월", completed: true },
  { label: "화", completed: true },
  { label: "수", completed: true },
  { label: "목", completed: true },
  { label: "금", completed: true },
  { label: "토", completed: true },
  { label: "일", completed: false, isToday: true },
];

export default function StreakCard() {
  return (
    <div className="flex h-[80px] w-full items-center rounded-xl border border-lineColor bg-white px-4">
      {/* 왼쪽: 연속 달성 숫자 */}
      <div className="flex flex-col items-start shrink-0 mr-4">
        <p className="text-[10px] font-medium text-buttonColor leading-none">연속 달성</p>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-xl font-bold text-textColor leading-none">{streakDays}일</span>
          <span className="text-sm">🔥</span>
        </div>
      </div>

      {/* 구분선 */}
      <div className="h-10 w-px bg-neutral-100 shrink-0" />

      {/* 오른쪽: 요일 원형 */}
      <div className="flex flex-1 justify-between pl-4">
        {week.map((day, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span
              className={`text-[9px] leading-none ${
                day.isToday ? "font-bold text-buttonColor" : "text-subtextColor"
              }`}
            >
              {day.label}
            </span>
            <div
              className={[
                "flex items-center justify-center rounded-full",
                day.isToday ? "h-6 w-6 ring-[1.5px] ring-buttonColor ring-offset-1" : "h-5 w-5",
                day.completed ? "bg-buttonColor" : "bg-neutral-100",
              ].join(" ")}
            >
              {day.completed && (
                <svg className="h-3 w-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
