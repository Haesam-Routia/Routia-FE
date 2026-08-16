import { useNavigate } from "react-router-dom";
import { PhoneFrame, HomeBase, SideMenu } from "../components/home";

export default function HomeMenuPage() {
  const navigate = useNavigate();
  const close = () => navigate("/home");

  return (
    <PhoneFrame>
      <HomeBase onDateClick={() => navigate("/home/calendar")} onViewAllTasks={() => navigate("/home/tasks")} />
      <SideMenu
        active="홈"
        onClose={close}
        onSelect={(item) => {
          if (item === "홈") navigate("/home");
          else if (item === "성취도") navigate("/score");
        }}
        onLogout={() => navigate("/login")}
        onWithdraw={() => navigate("/")}
      />
    </PhoneFrame>
  );
}
