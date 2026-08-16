import type { ProgressInfo } from "../../data/home";

interface ProgressCardProps {
  progress: ProgressInfo;
  onDetail?: () => void;
}

export default function ProgressCard({ progress, onDetail }: ProgressCardProps) {
  const percent = progress.percent;

  // 원형 게이지 계산
  const size = 150;
  const stroke = 16;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - percent / 100);

  return (
    <div className="w-full rounded-xl border border-lineColor bg-white px-5 py-4">
      {/* 제목 */}
      <h2 className="text-lg font-bold text-textColor">오늘 진행률</h2>
      <p className="mt-1 text-xs text-subtextColor">기대 효과: {progress.effect}</p>

      {/* 원형 게이지 */}
      <div className="my-5 flex justify-center">
        <div className="relative" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="-rotate-90">
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFB5C0" />
                <stop offset="100%" stopColor="#FF5D7B" />
              </linearGradient>
            </defs>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke="#EEEEEE"
              strokeWidth={stroke}
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-buttonColor">{percent}%</span>
            <span className="text-xs text-subtextColor">
              <span className="text-[#FF1C46]">{progress.done}</span>/{progress.total} 완료
            </span>
          </div>
        </div>
      </div>

      {/* 설명 보러가기 버튼 */}
      <button
        type="button"
        onClick={onDetail}
        className="flex h-11 w-full items-center justify-center gap-1.5 rounded-xl bg-buttonColor text-sm font-semibold text-white"
      >
        <span>✨</span>
        오늘 진행률에 대한 설명 보러 가기
      </button>
    </div>
  );
}
