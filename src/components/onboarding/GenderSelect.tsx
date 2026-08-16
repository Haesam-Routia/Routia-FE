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
        <label className="text-sm font-semibold text-textColor">{label}</label>
      )}

      <div className="mt-2 flex gap-3">
        {options.map((opt) => {
          const selected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange?.(opt.value)}
              className={`flex h-[100px] w-[100px] flex-col items-center justify-center gap-1 rounded-xl border transition-colors ${
                selected ? "border-buttonColor bg-mainLightColor" : "border-lineColor bg-white"
              }`}
            >
              {opt.icon && <span className="text-2xl">{opt.icon}</span>}
              <span
                className={`text-sm ${
                  selected ? "font-semibold text-buttonColor" : "text-gray-700"
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
