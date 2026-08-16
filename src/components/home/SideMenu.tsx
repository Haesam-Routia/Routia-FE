import { useEffect, useState } from "react";
import { menuItems } from "../../data/home";

interface SideMenuProps {
  active?: string;
  onClose?: () => void;
  onSelect?: (item: string) => void;
  onLogout?: () => void;
  onWithdraw?: () => void;
}

const menuIcons: Record<string, React.ReactNode> = {
  홈: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M12 3l9 8h-3v9h-5v-6h-2v6H6v-9H3l9-8z" />
    </svg>
  ),
  "AI 코치": (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7L12 16.4 5.7 21l2.3-7L2 9.4h7.6L12 2z" />
    </svg>
  ),
  성취도: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 20v-8M12 20V4M18 20v-12" />
    </svg>
  ),
  정보수정: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
};

export default function SideMenu({ active = "홈", onClose, onSelect, onLogout }: SideMenuProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 마운트 직후 애니메이션 시작
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => onClose?.(), 300);
  };

  return (
    <div className="absolute inset-0 z-30">
      {/* 스크림 */}
      <button
        type="button"
        aria-label="닫기"
        onClick={handleClose}
        className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* 패널: 오른쪽에서 슬라이드 인 */}
      <div
        className={`absolute right-0 top-0 h-full w-[280px] rounded-l-3xl bg-white shadow-[-4px_0_24px_rgba(0,0,0,0.08)] flex flex-col transition-transform duration-300 ease-out ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* 닫기 버튼 */}
        <div className="flex justify-end px-5 pt-5">
          <button
            type="button"
            aria-label="닫기"
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center"
          >
            <svg
              className="w-4 h-4 text-neutral-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 프로필 영역 */}
        <div className="flex items-center gap-3 px-6 pt-4 pb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF6B7A] to-[#DB4A5E] flex items-center justify-center text-white text-sm font-bold shrink-0">
            서은
          </div>
          <div>
            <p className="text-[15px] font-bold text-neutral-900">서은님</p>
            <p className="text-xs text-neutral-400">피부 프로필 92% 완성</p>
          </div>
        </div>

        {/* 구분선 */}
        <div className="mx-6 h-px bg-neutral-100" />

        {/* 메뉴 항목 */}
        <nav className="flex flex-col gap-1 px-4 pt-4">
          {menuItems.map((item) => {
            const isActive = item === active;
            return (
              <button
                key={item}
                type="button"
                onClick={() => onSelect?.(item)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-colors ${
                  isActive ? "bg-[#FFF1F3] text-[#FF5D7B]" : "text-neutral-700 hover:bg-neutral-50"
                }`}
              >
                <span className={isActive ? "text-[#FF5D7B]" : "text-neutral-400"}>
                  {menuIcons[item]}
                </span>
                <span className={`text-[15px] ${isActive ? "font-bold" : "font-semibold"}`}>
                  {item}
                </span>
                {isActive && (
                  <svg
                    className="w-4 h-4 ml-auto"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                )}
              </button>
            );
          })}
        </nav>

        {/* 하단: 로그아웃 + 버전 */}
        <div className="mt-auto px-6 pb-8">
          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-2 text-neutral-400 text-[13px] font-medium"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            로그아웃
          </button>
          <p className="mt-3 text-[11px] text-neutral-300">routine.ai · v1.2.0</p>
        </div>
      </div>
    </div>
  );
}
