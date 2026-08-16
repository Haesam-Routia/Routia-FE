interface HomeHeaderProps {
  onMenuClick?: () => void;
  onDateClick?: () => void;
}

export default function HomeHeader({ onMenuClick, onDateClick }: HomeHeaderProps) {
  return (
    <header className="flex items-start justify-between">
      <div>
        <p className="text-sm font-semibold text-subtextColor">좋은 하루예요, 서은님!</p>
        <button type="button" onClick={onDateClick} className="mt-1 flex items-center gap-1">
          <span className="text-2xl font-bold text-[#424242]">8월 5일 수요일</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="#424242"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <button type="button" onClick={onMenuClick} aria-label="메뉴" className="mt-1 p-1">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 7H20M4 12H20M4 17H20"
            stroke="#424242"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </header>
  );
}
