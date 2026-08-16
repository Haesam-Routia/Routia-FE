import { useNavigate } from "react-router-dom";
import ScorePage from "./ScorePage";
import { AchieveModal } from "../components/score";

export default function ScoreAchievePage() {
  const navigate = useNavigate();
  return (
    <>
      <ScorePage />
      <AchieveModal onClose={() => navigate("/score")} />
    </>
  );
}
