import { useEffect, useState } from "react";
import {
  getTodayDirection,
  type TodayDirectionData,
} from "../../api/todayDirection";
import { ApiError } from "../../api";

interface TodayDirectionCardProps {
  onClose?: () => void;
}

/** 카드 공통 프레임 (위치·크기·그림자). */
const FRAME =
  "absolute left-1/2 top-[30px] z-30 flex h-[656px] w-[362px] -translate-x-1/2 flex-col " +
  "overflow-hidden rounded-2xl border border-lineColor bg-white " +
  "shadow-[0_16px_40px_-16px_rgba(255,93,123,0.28)]";

/** 하단 닫기 버튼. */
function CloseButton({ onClose }: { onClose?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClose}
      className="flex h-[50px] w-full items-center justify-center rounded-xl bg-buttonColor text-sm font-semibold text-white transition-all duration-200 active:scale-[0.98]"
    >
      닫기
    </button>
  );
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
        if (err instanceof ApiError && err.status === 404) {
          setError("오늘의 루틴을 준비하고 있어요.\n잠시 후 다시 확인해 주세요.");
        } else {
          setError("데이터를 불러올 수 없습니다.");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className={`${FRAME} items-center justify-center`}>
        <span className="h-8 w-8 animate-spin rounded-full border-[3px] border-mainColor border-t-buttonColor" />
        <p className="mt-3 text-sm text-subtextColor">오늘의 방향을 불러오는 중...</p>
      </div>
    );
  }

  if (error || !direction) {
    return (
      <div className={FRAME}>
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <span className="text-[40px] leading-none">🌙</span>
          <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-subtextColor">
            {error}
          </p>
        </div>
        <div className="px-5 pb-6 pt-3">
          <CloseButton onClose={onClose} />
        </div>
      </div>
    );
  }

  return (
    <div className={FRAME}>
      {/* 헤더 */}
      <div className="flex items-center gap-1.5 px-5 pt-5">
        <span className="h-1.5 w-1.5 rounded-full bg-buttonColor" />
        <p className="text-[15px] font-semibold text-textColor">오늘의 방향</p>
      </div>

      {/* 본문 (스크롤 영역) */}
      <div className="flex-1 overflow-y-auto px-5 pb-4">
        {/* 히어로 */}
        <div className="mt-5 flex flex-col items-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-mainColor to-mainLightColor">
            <span className="text-[56px] leading-none">{direction.emoji}</span>
          </div>
          <h2 className="mt-4 text-center text-[19px] font-bold text-textColor">
            {direction.title}
          </h2>
          <p className="mt-2 text-center text-[13px] leading-relaxed text-subtextColor">
            {direction.description}
          </p>
        </div>

        {/* 구분선 */}
        <div className="my-6 h-px bg-lineColor/70" />

        {/* 시간대별 섹션 */}
        <div className="flex flex-col gap-3">
          {direction.sections.map((section) => {
            if (section.items.length === 0) return null;
            return (
              <div
                key={section.period}
                className="rounded-2xl border border-lineColor/60 bg-mainLightColor/50 px-4 py-3.5"
              >
                <div className="mb-2.5 flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[17px] shadow-[0_2px_6px_rgba(255,93,123,0.12)]">
                    {section.icon}
                  </span>
                  <span className="text-[13px] font-semibold text-textColor">
                    {section.label}
                  </span>
                </div>
                <ul className="flex flex-col gap-2 pl-0.5">
                  {section.items.map((item) => (
                    <li
                      key={item.itemId}
                      className="flex gap-2 text-[12.5px] leading-snug text-textColor"
                    >
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-buttonColor" />
                      <span>{item.detail || item.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* 하단 고정 버튼 */}
      <div className="px-5 pb-6 pt-3">
        <CloseButton onClose={onClose} />
      </div>
    </div>
  );
}
