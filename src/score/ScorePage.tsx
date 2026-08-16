import { useNavigate } from "react-router-dom";
import { ScoreHeader, SummaryCards, StreakCard, WeeklyTrendCard, HistoryCard } from "../components/score";

export default function ScorePage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full bg-white">
      <div className="mx-auto flex max-w-[420px] flex-col gap-5 px-4 pb-12 pt-6">
        <ScoreHeader onMenuClick={() => navigate("/home/menu")} />
        <SummaryCards />
        <StreakCard />
        <WeeklyTrendCard />
        <HistoryCard />
      </div>
    </div>
  );
}
