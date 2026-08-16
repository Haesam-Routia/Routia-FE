import { useNavigate } from "react-router-dom";
import { PhoneFrame, HomeBase, CompleteModal } from "../components/home";

export default function HomeCompletePage() {
  const navigate = useNavigate();
  const close = () => navigate("/home");

  return (
    <PhoneFrame>
      <HomeBase onMenuClick={() => navigate("/home/menu")} onDateClick={() => navigate("/home/calendar")} onViewAllTasks={() => navigate("/home/tasks")} />
      <CompleteModal onClose={close} onConfirm={() => navigate("/signup")} />
    </PhoneFrame>
  );
}
