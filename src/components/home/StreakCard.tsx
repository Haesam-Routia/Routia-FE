import { useEffect, useState } from "react";
import { getAchievementSummary } from "../../api";

const WEEKDAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];

/** 오늘을 가장 오른쪽으로 하여 최근 7일 요일 배열 생성 */
function getRecentWeek(): { label: string; isToday: boolean }[] {
  const today = new Date();
  const days: { label: string; isToday: boolean }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    days.push({ label: WEEKDAY_LABELS[d.getDay()], isToday: i === 0 });
  }
  return days;
}

export default function StreakCard() {
  const [streakDays, setStreakDays] = useState(0);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const summary = await getAchievementSummary();
        if (alive) setStreakDays(summary.streakDays);
      } catch {
        /* 백엔드 미가동: 0 유지 */
      }
    })();
    return () => { alive = false; };
  }, []);

  const week = getRecentWeek();

  return (
    <div className="flex flex-col w-full rounded-xl border border-lineColor bg-white px-4 py-3 gap-2">
      {/* 안내 문구 */}
      <p className="text-[12px] font-semibold text-buttonColor">
        오늘 할 일을 끝내면 연속달성이 가능해요
      </p>

      <div className="flex items-center">
      {/* 왼쪽: 연속 달성 숫자 */}
      <div className="flex flex-col items-start shrink-0 mr-4">
        <p className="text-[10px] font-medium text-buttonColor leading-none">연속 달성</p>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-xl font-bold text-textColor leading-none">{streakDays}일</span>
        </div>
      </div>

      {/* 구분선 */}
      <div className="h-10 w-px bg-neutral-100 shrink-0" />

      {/* 오른쪽: 요일 원형 (오늘이 가장 오른쪽, 연속 달성 일수만큼 오른쪽부터 체크) */}
      <div className="flex flex-1 justify-between pl-4">
        {week.map((day, i) => {
          // 오른쪽(인덱스 6=오늘)부터 streakDays만큼 체크
          const completed = i >= 7 - streakDays;
          return (
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
                  completed ? "bg-buttonColor" : "bg-neutral-100",
                ].join(" ")}
              >
                {completed && (
                  <svg className="h-3 w-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
}
