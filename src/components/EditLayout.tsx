import { useState, type ReactNode } from "react";
import InfoEditTabs from "./InfoEditTabs";
import SaveSuccessModal from "./SaveSuccessModal";
import { NextButton } from "./onboarding";

interface EditLayoutProps {
  active: string;
  children: ReactNode;
  onSave?: () => void;
}

export default function EditLayout({ active, children, onSave }: EditLayoutProps) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex min-h-screen flex-col px-6 pt-6 pb-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-textColor">정보수정</h1>
        <button type="button" aria-label="메뉴" className="text-2xl leading-none text-textColor">
          ≡
        </button>
      </div>

      <div className="mt-4">
        <InfoEditTabs active={active} />
      </div>

      <div className="mt-6 flex flex-col items-start gap-6">{children}</div>

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
