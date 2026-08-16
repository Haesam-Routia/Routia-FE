import { useNavigate } from "react-router-dom";
import { PhoneFrame, HomeBase } from "../components/home";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <PhoneFrame>
      <HomeBase
        onMenuClick={() => navigate("/home/menu")}
        onDateClick={() => navigate("/home/calendar")}
        onViewAllTasks={() => navigate("/home/tasks")}
        onProgressDetail={() => navigate("/home/direction")}
      />
    </PhoneFrame>
  );
}
