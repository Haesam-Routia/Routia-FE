import { useNavigate } from "react-router-dom";
import { PhoneFrame, HomeBase, TodayDirectionCard } from "../components/home";

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
