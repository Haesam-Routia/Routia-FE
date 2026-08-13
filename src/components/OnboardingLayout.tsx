import type { ReactNode } from "react";

interface OnboardingLayoutProps {
  children: ReactNode;
}

export default function OnboardingLayout({ children }: OnboardingLayoutProps) {
  return (
    <div className="flex min-h-screen w-full justify-center bg-gradient-to-b from-rose-100 via-pink-50 to-white px-6 py-12">
      <div className="flex w-full max-w-sm flex-col items-center gap-4 text-center">
        {children}
      </div>
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
      className="mt-2 h-[50px] w-[294px] rounded-xl bg-buttonColor px-4 py-3.5 text-sm font-semibold text-white"
    >
      {children}
    </button>
  );
}