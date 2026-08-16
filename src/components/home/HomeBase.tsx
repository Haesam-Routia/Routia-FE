import { weather, progress, todoGuide, todoSections } from "../../data/home";
import HomeHeader from "./HomeHeader";
import WeatherCard from "./WeatherCard";
import ProgressCard from "./ProgressCard";
import TodayTasksCard from "./TodayTasksCard";

interface HomeBaseProps {
  onMenuClick?: () => void;
  onDateClick?: () => void;
  onProgressDetail?: () => void;
  onViewAllTasks?: () => void;
}

// 홈 공통 콘텐츠 (헤더 + 날씨 + 진행률 + 오늘 할 일)
export default function HomeBase({
  onMenuClick,
  onDateClick,
  onProgressDetail,
  onViewAllTasks,
}: HomeBaseProps) {
  return (
    <div className="flex flex-col gap-4 px-4 pb-10 pt-6">
      <HomeHeader onMenuClick={onMenuClick} onDateClick={onDateClick} />
      <WeatherCard weather={weather} />
      <ProgressCard progress={progress} onDetail={onProgressDetail} />
      <TodayTasksCard guide={todoGuide} sections={todoSections} onViewAll={onViewAllTasks} />
    </div>
  );
}
