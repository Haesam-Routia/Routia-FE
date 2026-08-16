import { useEffect, useState } from "react";
import type { ProgressInfo } from "../../data/home";

interface ProgressCardProps {
  progress: ProgressInfo;
  onDetail?: () => void;
}

export default function ProgressCard({ progress, onDetail }: ProgressCardProps) {
  const percent = progress.percent;

  // 애니메이션: 페이지 진입 시 0에서 실제 퍼센트까지 게이지가 차오르는 효과
  const [animatedPercent, setAnimatedPercent] = useState(0);

  useEffect(() => {
    const duration = 1200; // ms
    const startTime = performance.now();
    let rafId: number;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic for smooth deceleration (speedometer feel)
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedPercent(Math.round(eased * percent));

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    // 약간의 딜레이 후 시작
    const timer = setTimeout(() => {
      rafId = requestAnimationFrame(animate);
    }, 100);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafId);
    };
  }, [percent]);

  // 원형 게이지 계산
  const size = 150;
  const stroke = 16;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - animatedPercent / 100);

  return (
    <div className="w-full rounded-xl border border-lineColor bg-white px-3 py-4">
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
            <span className="text-3xl font-bold text-buttonColor">{animatedPercent}%</span>
            <span className="text-xs text-subtextColor">
              <span className="text-[#FF1C46]">{progress.done}</span>/{progress.total} 완료
            </span>
          </div>
        </div>
      </div>

      {/* 설명 보러가기 버튼 */}
      <div className="flex gap-2">
      <button
        type="button"
        onClick={onDetail}
        className="flex h-13 w-full items-center justify-center gap-1.5 rounded-2xl border-[1.5px] border-[#fad3d7] bg-[#FFF3F3] text-sm font-semibold text-[#f14867]"
      >
        설명 보기
      </button>
      <button
        type="button"
        onClick={onDetail}
        className="flex h-13 w-full items-center justify-center gap-1.5 rounded-2xl bg-buttonColor text-sm font-semibold text-white"
      >
        AI 코치
      </button>
      </div>
    </div>
  );
}
