import type { ReactNode } from "react";

interface GenderOption {
  value: string;
  label: string;
  icon?: ReactNode;
}

interface GenderSelectProps {
  label?: string;
  options: GenderOption[];
  value?: string;
  onChange?: (v: string) => void;
}

export default function GenderSelect({
  label = "성별",
  options,
  value,
  onChange,
}: GenderSelectProps) {
  return (
    <div>
      {label && (
        <label className="text-[15.5px] font-extrabold text-ob-ink">{label}</label>
      )}

      <div className="mt-3 flex gap-3">
        {options.map((opt) => {
          const selected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange?.(opt.value)}
              className={`flex h-[100px] w-[100px] flex-col items-center justify-center gap-1 rounded-ob-lg border-[1.5px] transition-all duration-150 ${
                selected
                  ? "border-ob-primary bg-gradient-to-b from-ob-primary-softer to-ob-primary-soft shadow-ob-card"
                  : "border-ob-border bg-ob-surface hover:border-ob-primary hover:-translate-y-[1px]"
              }`}
            >
              {opt.icon && <span className="text-2xl">{opt.icon}</span>}
              <span
                className={`text-sm font-bold ${
                  selected ? "text-ob-primary-text" : "text-ob-ink"
                }`}
              >
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
