import { useNavigate } from "react-router-dom";
import { PhoneFrame, HomeBase, WeeklyCalendar, BlurScrim } from "../components/home";

export default function HomeCalendarPage() {
  const navigate = useNavigate();
  const close = () => navigate("/home");

  return (
    <PhoneFrame>
      <HomeBase onMenuClick={() => navigate("/home/menu")} onViewAllTasks={() => navigate("/home/tasks")} />

      <div className="absolute inset-0 z-30">
        <BlurScrim onClose={close} />
        <div className="relative">
          <WeeklyCalendar onClose={close} onSelectDay={close} />
        </div>
      </div>
    </PhoneFrame>
  );
}
