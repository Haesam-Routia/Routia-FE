import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ScoreHeader,
  SummaryCards,
  StreakCard,
  WeeklyTrendCard,
  HistoryCard,
} from "../components/score";
import SideMenu from "../components/home/SideMenu";
import {
  clearAccessToken,
  getAchievementHistory,
  getAchievementSummary,
  getWeeklyTrend,
} from "../api";
import type { WeeklyTrendItem, HistoryItem } from "../data/score";

// "2026-08-03" → "8/3"
const md = (iso: string) => {
  const d = new Date(`${iso}T00:00:00`);
  return Number.isNaN(d.getTime()) ? iso : `${d.getMonth() + 1}/${d.getDate()}`;
};
const weekdayOf = (iso: string) => {
  const d = new Date(`${iso}T00:00:00`);
  return Number.isNaN(d.getTime()) ? "" : ["일", "월", "화", "수", "목", "금", "토"][d.getDay()];
};

export default function ScorePage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  // 라이브 데이터 (로드 전/실패 시 undefined → 각 카드가 mock 폴백)
  const [summary, setSummary] = useState<{ weeklyRate: number; vsLastWeek: number; avgCompleted: number }>();
  const [streakDays, setStreakDays] = useState<number>();
  const [trend, setTrend] = useState<WeeklyTrendItem[]>();
  const [history, setHistory] = useState<HistoryItem[]>();

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const s = await getAchievementSummary();
        if (!alive) return;
        setSummary({
          weeklyRate: s.weeklyPerformanceRate,
          vsLastWeek: s.previousWeekDiff,
          avgCompleted: s.avgCompletedCount,
        });
        setStreakDays(s.streakDays);
      } catch {
        /* mock 폴백 */
      }
      try {
        const t = await getWeeklyTrend();
        if (!alive) return;
        setTrend(
          t.days.map((d) => ({
            label: `${weekdayOf(d.date)} ${md(d.date)}`,
            value: d.totalCount > 0 ? Math.round((d.completedCount / d.totalCount) * 100) : 0,
          })),
        );
      } catch {
        /* mock 폴백 */
      }
      try {
        const h = await getAchievementHistory();
        if (!alive) return;
        setHistory(
          h.weeks.map((w) => ({
            period: `${md(w.weekStart)} - ${md(w.weekEnd)}`,
            desc: `수행률 ${w.performanceRate}% · 총 ${w.totalCount}개 중 ${w.completedCount}개 완료`,
          })),
        );
      } catch {
        /* mock 폴백 */
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-white">
      <div className="mx-auto flex max-w-[420px] flex-col gap-5 px-4 pb-12 pt-6">
        <ScoreHeader onMenuClick={() => setMenuOpen(true)} />
        <SummaryCards data={summary} />
        <StreakCard days={streakDays} />
        <WeeklyTrendCard data={trend} />
        <HistoryCard data={history} />
      </div>

      {menuOpen && (
        <SideMenu
          active="성취도"
          onClose={() => setMenuOpen(false)}
          onSelect={(item) => {
            setMenuOpen(false);
            if (item === "홈") navigate("/home");
            else if (item === "성취도") navigate("/score");
            else if (item === "정보수정") navigate("/edit/body");
          }}
          onLogout={() => {
            clearAccessToken();
            navigate("/login");
          }}
        />
      )}
    </div>
  );
}
