import { weather, progress, todoGuide } from "../../data/home";
import HomeHeader from "./HomeHeader";
import WeatherCard from "./WeatherCard";
import ProgressCard from "./ProgressCard";
import TodayTasksCard from "./TodayTasksCard";
import StreakCard from "./StreakCard";

interface HomeBaseProps {
  onMenuClick?: () => void;
  onDateClick?: () => void;
  onProgressDetail?: () => void;
}

export default function HomeBase({ onMenuClick, onDateClick, onProgressDetail }: HomeBaseProps) {
  return (
    <div className="flex flex-col gap-4 px-4 pb-10 pt-6">
      <HomeHeader onMenuClick={onMenuClick} onDateClick={onDateClick} />
      <WeatherCard weather={weather} />
      <ProgressCard progress={progress} onDetail={onProgressDetail} />
      <TodayTasksCard guide={todoGuide} />
      <StreakCard />
    </div>
  );
}
