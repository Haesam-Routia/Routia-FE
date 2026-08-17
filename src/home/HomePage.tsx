import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PhoneFrame,
  HomeBase,
  SideMenu,
  WeeklyCalendar,
  CompleteModal,
  TodayDirectionCard,
} from "../components/home";
import { clearAccessToken, getHome, getTodayWeather } from "../api";
import type { WeatherInfo, ProgressInfo } from "../data/home";

type Overlay = "none" | "menu" | "calendar" | "complete" | "direction";

export default function HomePage() {
  const navigate = useNavigate();
  const [overlay, setOverlay] = useState<Overlay>("none");
  // 라이브 데이터. 로드 전/실패 시 undefined → HomeBase 가 mock 으로 폴백.
  const [weather, setWeather] = useState<WeatherInfo>();
  const [progress, setProgress] = useState<ProgressInfo>();
  const [guide, setGuide] = useState<string>();

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const home = await getHome();
        if (!alive) return;
        setProgress({
          effect: home.homeComment,
          percent: home.progressPercent,
          done: home.completedCount,
          total: home.totalCount,
        });
        setGuide(home.directionText);
      } catch {
        /* 백엔드 미가동: mock 폴백 */
      }
      try {
        const w = await getTodayWeather();
        if (!alive) return;
        setWeather({
          location: `${w.regionSido} ${w.regionSigungu}`.trim(),
          temp: Math.round(w.temperature),
          feelsLike: Math.round(w.feelsLike),
          condition: w.weatherDescription,
          uvIndex: w.uvIndex,
          uvLevel: w.uvLevel,
          uvDesc: w.uvTip,
        });
      } catch {
        /* 백엔드 미가동: mock 폴백 */
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const close = () => setOverlay("none");

  return (
    <PhoneFrame>
      <HomeBase
        onMenuClick={() => setOverlay("menu")}
        onDateClick={() => setOverlay("calendar")}
        onProgressDetail={() => setOverlay("direction")}
        weather={weather}
        progress={progress}
        guide={guide}
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
          onLogout={() => {
            clearAccessToken();
            navigate("/login");
          }}
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
