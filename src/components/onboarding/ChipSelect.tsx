interface ChipSelectProps {
  label?: string;
  required?: boolean;
  options: string[];
  value?: string;
  onChange?: (v: string) => void;
  /** 버튼 크기 등 (예: "w-[60px] h-[41px]") */
  itemClassName?: string;
}

export default function ChipSelect({
  label,
  required = false,
  options,
  value,
  onChange,
  itemClassName = "",
}: ChipSelectProps) {
  return (
    <div>
      {label && (
        <label className="text-[15.5px] font-extrabold text-ob-ink flex items-center gap-[5px]">
          {label}
          {required && <span className="text-ob-primary font-extrabold">*</span>}
        </label>
      )}

      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange?.(opt)}
              className={`rounded-full border-[1.5px] text-[13.5px] font-bold transition-all duration-150 flex items-center justify-center gap-1.5 ${itemClassName || "px-4 py-[9px]"} ${
                selected
                  ? "border-ob-primary bg-gradient-to-b from-ob-primary-soft to-[#FFD3D8] text-ob-primary-text shadow-[inset_0_0_0_1px_rgba(255,107,122,0.3),0_3px_8px_-3px_rgba(219,74,94,0.35)]"
                  : "border-ob-border-strong bg-ob-surface text-ob-ink hover:border-ob-primary hover:-translate-y-[1px]"
              }`}
            >
              {selected && (
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              )}
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
