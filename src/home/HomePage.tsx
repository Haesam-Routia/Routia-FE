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
import { clearAccessToken, getHome, getTodayRoutines, getTodayWeather } from "../api";
import type { TimeSlot } from "../api";
import type { WeatherInfo, ProgressInfo, TodoSection } from "../data/home";

type Overlay = "none" | "menu" | "calendar" | "complete" | "direction";

const SLOT_LABEL: Record<TimeSlot, string> = {
  MORNING: "오전",
  AFTERNOON: "오후",
  EVENING: "저녁",
  BEFORE_SLEEP: "취침 전",
};

// "2026-08-18" → "8월 18일 화요일"
function formatKoreanDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  const week = ["일", "월", "화", "수", "목", "금", "토"][d.getDay()];
  return `${d.getMonth() + 1}월 ${d.getDate()}일 ${week}요일`;
}

export default function HomePage() {
  const navigate = useNavigate();
  const [overlay, setOverlay] = useState<Overlay>("none");
  // 라이브 데이터. 로드 전/실패 시 undefined → HomeBase 가 mock 으로 폴백.
  const [weather, setWeather] = useState<WeatherInfo>();
  const [progress, setProgress] = useState<ProgressInfo>();
  const [guide, setGuide] = useState<string>();
  const [userName, setUserName] = useState<string>();
  const [dateText, setDateText] = useState<string>();
  const [tasks, setTasks] = useState<TodoSection[]>();

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
        setUserName(home.userName);
        setDateText(formatKoreanDate(home.date));
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
      try {
        const today = await getTodayRoutines();
        if (!alive) return;
        // timeSlot 순서 유지하며 시간대별로 그룹핑
        const grouped: TodoSection[] = [];
        for (const it of today.items) {
          const period = SLOT_LABEL[it.timeSlot] ?? "오전";
          let section = grouped.find((g) => g.period === period);
          if (!section) {
            section = { period, items: [] };
            grouped.push(section);
          }
          section.items.push({ id: it.itemId, label: it.title, done: it.completed });
        }
        setTasks(grouped);
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
        userName={userName}
        dateText={dateText}
        tasks={tasks}
      />

      {/* 사이드 메뉴 */}
      {overlay === "menu" && (
        <SideMenu
          active="홈"
          userName={userName}
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
