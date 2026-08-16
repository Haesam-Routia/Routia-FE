import { useNavigate } from "react-router-dom";
import { PhoneFrame, HomeBase, TodayDirectionCard } from "../components/home";

// 동기부여 버튼 누름 → 오늘의 방향 카드
export default function HomeDirectionPage() {
  const navigate = useNavigate();
  return (
    <PhoneFrame>
      <HomeBase
        onMenuClick={() => navigate("/home/menu")}
        onDateClick={() => navigate("/home/calendar")}
        onViewAllTasks={() => navigate("/home/tasks")}
      />
      <TodayDirectionCard onClose={() => navigate("/home")} />
    </PhoneFrame>
  );
}
