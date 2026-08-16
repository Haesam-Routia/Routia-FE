import { menuItems } from "../../data/home";
import cancelIcon from "../../assets/routia-cancellation.svg";

// 메뉴바 패널 배경 (width 150 / border-radius 12 0 0 12 / 그라데이션)
const PANEL_GRADIENT = "linear-gradient(180deg, rgba(249,204,211,0.50) 0%, #FFA3B1 100%)";

interface SideMenuProps {
  active?: string;
  onClose?: () => void;
  onSelect?: (item: string) => void;
  onLogout?: () => void;
  onWithdraw?: () => void;
}

// 우측 슬라이드 메뉴바 (배경: CSS 그라데이션)
export default function SideMenu({
  active = "홈",
  onClose,
  onSelect,
  onLogout,
  onWithdraw,
}: SideMenuProps) {
  return (
    <div className="absolute inset-0 z-30">
      {/* 스크림 */}
      <button
        type="button"
        aria-label="닫기"
        onClick={onClose}
        className="absolute inset-0 bg-black/10"
      />

      {/* 패널: width 150 / rounded-l 12px / 그라데이션 배경.
          흰색 베이스 위에 그라데이션을 올려 상단 반투명(0.5) 영역이 뒤 내용 대신 연핑크로 보이게 함.
          높이는 프레임 전체를 채워(h-full) 하단에 빈 공간이 생기지 않도록 함 */}
      <div className="absolute right-0 top-0 h-full w-[150px] overflow-hidden rounded-l-xl bg-white">
        <div className="absolute inset-0" style={{ background: PANEL_GRADIENT }} />

        <div className="relative flex h-full flex-col pt-4">
          {/* 닫기 */}
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            className="mb-3 mr-[22px] self-end p-1"
          >
            <img src={cancelIcon} alt="닫기" className="h-[19px] w-[19px]" />
          </button>

          {/* 메뉴 항목: 기본 16px/400, 선택 시 #FF849B 배너(150×45) + 20px/500
              항목 간 간격 40px, 좌우 22px(내용폭 106px) */}
          <nav className="flex flex-col gap-[40px]">
            {menuItems.map((item) => {
              const isActive = item === active;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => onSelect?.(item)}
                  className={
                    isActive
                      ? "flex h-[45px] items-center bg-[#FF849B] px-[22px] text-left text-[20px] font-medium text-[#424242]"
                      : "px-[22px] text-left text-[16px] font-normal text-[#424242]"
                  }
                >
                  {item}
                </button>
              );
            })}
          </nav>

          {/* 하단: 로그아웃(16px/400), 회원 탈퇴(16px/600), 간격 18px */}
          <div className="mt-auto flex flex-col gap-[18px] px-[22px] pb-8">
            <button
              type="button"
              onClick={onLogout}
              className="text-left text-[16px] font-normal text-[#424242]"
            >
              로그아웃
            </button>
            <button
              type="button"
              onClick={onWithdraw}
              className="text-left text-[16px] font-semibold text-[#424242]"
            >
              회원 탈퇴
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
