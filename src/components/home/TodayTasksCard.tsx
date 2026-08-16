import type { TodoSection } from "../../data/home";
import TaskCheckItem from "./TaskCheckItem";

interface TodayTasksCardProps {
  guide: string;
  sections: TodoSection[];
  onViewAll?: () => void;
}

export default function TodayTasksCard({ guide, sections, onViewAll }: TodayTasksCardProps) {
  return (
    <div className="w-full rounded-xl border border-lineColor bg-white px-[25px] pb-[25px] pt-[25px]">
      {/* 제목 */}
      <h2 className="text-lg font-bold text-textColor">오늘 할 일</h2>
      <p className="mt-1 whitespace-pre-line text-xs text-subtextColor">{guide}</p>

      {sections.map((section) => (
        <div key={section.period} className="mt-4">
          {/* 오전 → 첫 항목 간격 16px */}
          <p className="mb-4 text-sm text-subtextColor">{section.period}</p>
          {/* 항목 간 간격 16px */}
          <ul className="flex flex-col gap-4">
            {section.items.map((item) => (
              <TaskCheckItem key={item.id} label={item.label} done={item.done} />
            ))}
          </ul>
        </div>
      ))}

      {/* 전체보기 */}
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs text-[#FF1C46] underline underline-offset-2"
        >
          오늘 할 일 전체보기
        </button>
      </div>
    </div>
  );
}
