import type { ReactNode } from "react";

interface OnboardingShellProps {
  /** Current step (1-4) */
  step: number;
  /** Total steps */
  totalSteps?: number;
  /** Eyebrow text (small text above title) */
  eyebrow?: string;
  /** Main title (can include JSX for line breaks) */
  title: ReactNode;
  /** Subtitle description */
  subtitle?: ReactNode;
  /** Content area */
  children: ReactNode;
  /** Footer button label */
  buttonLabel?: string;
  /** Footer button click */
  onNext?: () => void;
  /** Footer button disabled */
  disabled?: boolean;
  /** Back navigation */
  onBack?: () => void;
}

export default function OnboardingShell({
  step,
  totalSteps = 4,
  eyebrow,
  title,
  subtitle,
  children,
  buttonLabel = "다음으로",
  onNext,
  disabled = false,
  onBack,
}: OnboardingShellProps) {
  const progressPercent = (step / totalSteps) * 100;

  return (
    <div className="relative flex w-full flex-col bg-ob-bg min-h-screen">
      {/* Top Nav */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-4 shrink-0">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="w-[34px] h-[34px] rounded-full bg-ob-surface border border-ob-border flex items-center justify-center shrink-0 shadow-[0_2px_6px_rgba(43,35,32,0.06)]"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}
        <div className="flex-1 h-[5px] rounded-full bg-ob-border overflow-hidden relative">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#FFB3BA] to-ob-primary transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <span className="text-xs font-bold text-ob-ink-soft shrink-0">
          {step} / {totalSteps}
        </span>
      </div>

      {/* Header */}
      <div className="px-5 pb-2">
        {eyebrow && (
          <p className="text-[11.5px] font-extrabold text-ob-primary-text uppercase tracking-wide flex items-center gap-[7px] mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-ob-primary to-ob-primary-deep" />
            {eyebrow}
          </p>
        )}
        <h1 className="text-[26px] font-extrabold text-ob-ink leading-tight tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2.5 text-[13.5px] text-ob-ink-soft leading-relaxed">{subtitle}</p>
        )}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 pt-3 pb-[140px]">
        <div className="flex flex-col gap-5">{children}</div>
      </div>

      {/* Sticky Footer */}
      <div className="absolute left-0 right-0 bottom-0 px-5 pb-6 pt-4 bg-gradient-to-t from-ob-bg via-ob-bg to-transparent">
        <button
          type="button"
          onClick={onNext}
          disabled={disabled}
          className="w-full h-[54px] rounded-full bg-gradient-to-br from-ob-primary to-ob-primary-deep text-white text-[15.5px] font-extrabold tracking-tight flex items-center justify-center gap-1.5 shadow-ob-btn transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed"
        >
          {buttonLabel}
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
