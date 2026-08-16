import { useNavigate } from "react-router-dom";
import { PhoneFrame, HomeBase, AllTasksSheet } from "../components/home";

export default function HomeTasksPage() {
  const navigate = useNavigate();
  const close = () => navigate("/home");

  return (
    <PhoneFrame>
      <HomeBase onMenuClick={() => navigate("/home/menu")} onDateClick={() => navigate("/home/calendar")} />
      <AllTasksSheet onClose={close} />
    </PhoneFrame>
  );
}
