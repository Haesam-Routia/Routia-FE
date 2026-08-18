import {
  weather as mockWeather,
  progress as mockProgress,
  todoGuide as mockGuide,
  type WeatherInfo,
  type ProgressInfo,
  type TodoSection,
} from "../../data/home";
import HomeHeader from "./HomeHeader";
import WeatherCard from "./WeatherCard";
import ProgressCard from "./ProgressCard";
import TodayTasksCard from "./TodayTasksCard";
import StreakCard from "./StreakCard";

interface HomeBaseProps {
  onMenuClick?: () => void;
  onDateClick?: () => void;
  onProgressDetail?: () => void;
  // 라이브 데이터 오버라이드 (미전달 시 mock 사용 → 백엔드 없이도 렌더)
  weather?: WeatherInfo;
  progress?: ProgressInfo;
  guide?: string;
  userName?: string;
  dateText?: string;
  tasks?: TodoSection[];
}

export default function HomeBase({
  onMenuClick,
  onDateClick,
  onProgressDetail,
  weather = mockWeather,
  progress = mockProgress,
  guide = mockGuide,
  userName,
  dateText,
  tasks,
}: HomeBaseProps) {
  return (
    <div className="flex flex-col gap-4 px-4 pb-10 pt-6">
      <HomeHeader
        onMenuClick={onMenuClick}
        onDateClick={onDateClick}
        userName={userName}
        dateText={dateText}
      />
      <WeatherCard weather={weather} />
      <ProgressCard progress={progress} onDetail={onProgressDetail} />
      <TodayTasksCard guide={guide} sections={tasks} done={progress.done} total={progress.total} />
      <StreakCard />
    </div>
  );
}
