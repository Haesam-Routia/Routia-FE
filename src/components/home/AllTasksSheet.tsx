import { allTaskSections, progress } from "../../data/home";
import TaskCheckItem from "./TaskCheckItem";
import BlurScrim from "./BlurScrim";

interface AllTasksSheetProps {
  onClose?: () => void;
}

// 오늘 할 일 전체보기 (하단 시트)
export default function AllTasksSheet({ onClose }: AllTasksSheetProps) {
  return (
    <div className="absolute inset-0 z-30 flex flex-col justify-end">
      {/* 스크림 (전체화면 블러) */}
      <BlurScrim onClose={onClose} />

      {/* 시트 */}
      <div className="relative max-h-[70%] overflow-y-auto rounded-t-2xl bg-white px-5 pb-8 pt-5 shadow-[0_-8px_24px_rgba(0,0,0,0.12)]">
        {/* 헤더 */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-bold text-textColor">
            오늘 할 일(<span className="text-[#FF1C46]">{progress.done}</span>/{progress.total})
          </h3>
          <button type="button" aria-label="닫기" onClick={onClose} className="p-1">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 5L15 15M15 5L5 15" stroke="#4C4C4C" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* 섹션 */}
        <div className="flex flex-col gap-5">
          {allTaskSections.map((section) => (
            <div key={section.period}>
              <p className="mb-2 text-sm text-subtextColor">{section.period}</p>
              <ul className="flex flex-col gap-3">
                {section.items.map((item) => (
                  <TaskCheckItem key={item.id} label={item.label} done={item.done} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
