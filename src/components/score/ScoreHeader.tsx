interface ScoreHeaderProps {
  onMenuClick?: () => void;
}

export default function ScoreHeader({ onMenuClick }: ScoreHeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-[22px] font-medium text-[#1F1F1C]">성취도 및 변화분석</h1>
      <button type="button" onClick={onMenuClick} aria-label="메뉴" className="p-1">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 7H20M4 12H20M4 17H20" stroke="#424242" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
    </header>
  );
}
