import type { ReactNode } from "react";

interface OnboardingLayoutProps {
  children: ReactNode;
}

export default function OnboardingLayout({ children }: OnboardingLayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white px-6 py-12 pt-47">
      <div className="flex w-full flex-col items-center gap-4 text-center">{children}</div>
    </div>
  );
}

interface OnboardingButtonProps {
  onClick?: () => void;
  children: ReactNode;
}

export function OnboardingButton({ onClick, children }: OnboardingButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-2 h-[50px] w-full rounded-xl bg-buttonColor px-4 py-3.5 text-sm font-semibold text-white transition-all duration-200 active:scale-[0.98]"
    >
      {children}
    </button>
  );
}
