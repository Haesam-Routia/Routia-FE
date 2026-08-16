import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PhoneFrame,
  HomeBase,
  SideMenu,
  WeeklyCalendar,
  CompleteModal,
  TodayDirectionCard,
} from "../components/home";

type Overlay = "none" | "menu" | "calendar" | "complete" | "direction";

export default function HomePage() {
  const navigate = useNavigate();
  const [overlay, setOverlay] = useState<Overlay>("none");

  const close = () => setOverlay("none");

  return (
    <PhoneFrame>
      <HomeBase
        onMenuClick={() => setOverlay("menu")}
        onDateClick={() => setOverlay("calendar")}
        onProgressDetail={() => setOverlay("direction")}
      />

      {/* 사이드 메뉴 */}
      {overlay === "menu" && (
        <SideMenu
          active="홈"
          onClose={close}
          onSelect={(item) => {
            close();
            if (item === "성취도") navigate("/score");
            else if (item === "정보수정") navigate("/edit/body");
          }}
          onLogout={() => navigate("/login")}
        />
      )}

      {/* 위클리 달력 */}
      {overlay === "calendar" && <WeeklyCalendar onClose={close} onSelectDay={close} />}

      {/* 완료 모달 */}
      {overlay === "complete" && (
        <CompleteModal onClose={close} onConfirm={() => navigate("/signup")} />
      )}

      {/* 오늘의 방향 카드 */}
      {overlay === "direction" && <TodayDirectionCard onClose={close} />}
    </PhoneFrame>
  );
}
