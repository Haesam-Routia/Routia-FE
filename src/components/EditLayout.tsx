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
  onSave?: () => void | Promise<void>;
}

export default function EditLayout({ active, children, onSave }: EditLayoutProps) {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
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
          disabled={saving}
          onClick={async () => {
            if (saving) return;
            setSaving(true);
            try {
              await onSave?.();
              setSaved(true);
            } catch (e) {
              setErrorMsg(e instanceof Error && e.message ? e.message : "저장에 실패했습니다.");
            } finally {
              setSaving(false);
            }
          }}
        >
          {saving ? "저장 중..." : "저장하기"}
        </NextButton>
      </div>

      <SaveSuccessModal open={saved} onClose={() => setSaved(false)} />

      {errorMsg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
          <div className="flex w-[280px] flex-col items-center rounded-2xl bg-white px-6 py-8 shadow-xl">
            <span className="text-[40px] leading-none">⚠️</span>
            <p className="mt-4 whitespace-pre-line text-center text-sm text-textColor">{errorMsg}</p>
            <button
              type="button"
              onClick={() => setErrorMsg(null)}
              className="mt-5 h-[40px] w-full rounded-xl bg-buttonColor text-sm font-semibold text-white transition-all duration-200 active:scale-[0.98]"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
