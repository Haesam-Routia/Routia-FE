import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ScoreHeader,
  SummaryCards,
  StreakCard,
  WeeklyTrendCard,
  HistoryCard,
} from "../components/score";
import SideMenu from "../components/home/SideMenu";
import { clearAccessToken } from "../api";

export default function ScorePage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="relative min-h-screen w-full bg-white">
      <div className="mx-auto flex max-w-[420px] flex-col gap-5 px-4 pb-12 pt-6">
        <ScoreHeader onMenuClick={() => setMenuOpen(true)} />
        <SummaryCards />
        <StreakCard />
        <WeeklyTrendCard />
        <HistoryCard />
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
