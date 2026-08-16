// 오버레이(달력 / 오늘 할 일 / 완료 모달) 뒤 전체화면 블러 스크림
//
// ┌─ 블러 강도 조절 ────────────────────────────────────────────┐
// │ 아래 BLUR 의 px 숫자만 바꾸면 됩니다. 클수록 더 흐려집니다.   │
// │   backdrop-blur-[2px]  → 아주 약함                            │
// │   backdrop-blur-[4px]  → 약함(현재)                           │
// │   backdrop-blur-[8px]  → 보통                                 │
// │   backdrop-blur-[12px] → 강함                                 │
// │ 딤(어둡기)은 DIM 의 흰색 투명도(/10, /20 …)로 조절합니다.     │
// └──────────────────────────────────────────────────────────────┘
const BLUR = "backdrop-blur-[4px]";
const DIM = "bg-white/10";

interface BlurScrimProps {
  onClose?: () => void;
}

export default function BlurScrim({ onClose }: BlurScrimProps) {
  return (
    <button
      type="button"
      aria-label="닫기"
      onClick={onClose}
      className={`absolute inset-0 ${DIM} ${BLUR}`}
    />
  );
}
