import type { ReactNode } from "react";

interface NextButtonProps {
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export default function NextButton({ children = "다음으로", onClick, disabled = false }: NextButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="w-full h-[54px] rounded-full bg-gradient-to-br from-ob-primary to-ob-primary-deep text-white text-[15.5px] font-extrabold tracking-tight flex items-center justify-center gap-1.5 shadow-ob-btn transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed"
    >
      {children}
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
    </button>
  );
}
