import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import InfoEditTabs from "./InfoEditTabs";
import SaveSuccessModal from "./SaveSuccessModal";
import { NextButton } from "./onboarding";
import SideMenu from "./home/SideMenu";
import { clearAccessToken } from "../api";

interface EditLayoutProps {
  active: string;
  children: ReactNode;
  onSave?: () => void;
}

export default function EditLayout({ active, children, onSave }: EditLayoutProps) {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen flex-col px-6 pt-6 pb-6 w-full">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-textColor">정보수정</h1>
        <button
          type="button"
          aria-label="메뉴"
          onClick={() => setMenuOpen(true)}
          className="text-2xl leading-none text-textColor"
        >
          ≡
        </button>
      </div>

      {menuOpen && (
        <SideMenu
          active="정보수정"
          onClose={() => setMenuOpen(false)}
          onSelect={(item) => {
            setMenuOpen(false);
            if (item === "홈") navigate("/home");
            else if (item === "성취도") navigate("/score");
            else if (item === "정보수정") navigate("/edit/body");
          }}
          onLogout={() => {
            clearAccessToken();
            navigate("/login");
          }}
        />
      )}

      {/* 탭 */}
      <div className="mt-4">
        <InfoEditTabs active={active} />
      </div>

      {/* 내용 (step1/2/3와 동일한 gap-6) */}
      <div className="mt-6 flex flex-col items-start gap-6">{children}</div>

      {/* 저장하기 (step3 버튼과 동일 크기 294×50, 하단 고정) */}
      <div className="mt-auto flex flex-col pt-8">
        <NextButton
          onClick={() => {
            onSave?.();
            setSaved(true);
          }}
        >
          저장하기
        </NextButton>
      </div>

      <SaveSuccessModal open={saved} onClose={() => setSaved(false)} />
    </div>
  );
}
