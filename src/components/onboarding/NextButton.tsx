import type { ReactNode } from "react";

interface NextButtonProps {
  children?: ReactNode;
  onClick?: () => void;
}

export default function NextButton({ children = "다음으로", onClick }: NextButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-[50px] w-[294px] self-center rounded-xl bg-buttonColor text-base font-semibold text-white transition-colors active:bg-buttonPressedColor"
    >
      {children}
    </button>
  );
}
