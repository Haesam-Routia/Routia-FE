import { useEffect, useState } from "react";
import {
  getTodayDirection,
  type TodayDirectionData,
} from "../../api/todayDirection";

interface TodayDirectionCardProps {
  onClose?: () => void;
}

export default function TodayDirectionCard({
  onClose,
}: TodayDirectionCardProps) {
  const [direction, setDirection] = useState<TodayDirectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTodayDirection()
      .then((data) => setDirection(data))
      .catch((err) => {
        if (err.response?.status === 404) {
          setError("오늘의 루틴을 준비하고 있어요.\n잠시 후 다시 확인해 주세요.");
        } else {
          setError("데이터를 불러올 수 없습니다.");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="absolute left-1/2 top-[30px] z-30 flex h-[656px] w-[362px] -translate-x-1/2 items-center justify-center rounded-xl border border-lineColor bg-white">
        <p className="text-sm text-subtextColor">로딩 중...</p>
      </div>
    );
  }

  if (error || !direction) {
    return (
      <div className="absolute left-1/2 top-[30px] z-30 flex h-[656px] w-[362px] -translate-x-1/2 flex-col items-center justify-center rounded-xl border border-lineColor bg-white px-5">
        <p className="whitespace-pre-line text-center text-sm text-subtextColor">
          {error}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 flex h-[50px] w-[202px] items-center justify-center rounded-xl bg-buttonColor px-4 py-3.5 text-sm font-semibold text-white"
        >
          닫기
        </button>
      </div>
    );
  }

  return (
    <div className="absolute left-1/2 top-[30px] z-30 flex h-[656px] w-[362px] -translate-x-1/2 flex-col rounded-xl border border-lineColor bg-white pb-[28px] pt-[21px]">
      <div className="pl-5 pr-[15px]">
        <p className="text-[16px] font-medium text-textColor">오늘의 방향</p>
        <div className="mt-6 flex justify-center">
          <span className="text-[100px] leading-none">{direction.emoji}</span>
        </div>
        <h2 className="mt-4 text-center text-lg font-bold text-textColor">
          {direction.title}
        </h2>
        <p className="mt-2 text-center text-[13px] text-subtextColor">
          {direction.description}
        </p>
        <div className="mt-6 flex flex-col gap-[42px]">
          {direction.sections.map((section) => {
            if (section.items.length === 0) return null;
            return (
              <div key={section.period} className="flex gap-3">
                <div className="flex w-9 shrink-0 flex-col items-center gap-1 pt-0.5">
                  <span className="text-2xl leading-none">{section.icon}</span>
                  <span className="text-[11px] text-subtextColor">
                    {section.label}
                  </span>
                </div>
                <ul className="flex flex-1 flex-col gap-1.5 pt-1">
                  {section.items.map((item) => (
                    <li
                      key={item.itemId}
                      className="flex gap-1 text-[12px] leading-snug text-textColor"
                    >
                      <span>•</span>
                      <span>{item.detail || item.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="mx-auto mt-auto flex h-[50px] w-[202px] items-center justify-center rounded-xl bg-buttonColor px-4 py-3.5 text-sm font-semibold text-white"
      >
        닫기
      </button>
    </div>
  );
}
