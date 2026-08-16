interface MultiChipSelectProps {
  label?: string;
  required?: boolean;
  hint?: string;
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
  itemClassName?: string;
}

export default function MultiChipSelect({
  label,
  required = false,
  hint,
  options,
  value,
  onChange,
  itemClassName = "px-4 py-[9px]",
}: MultiChipSelectProps) {
  const toggle = (opt: string) =>
    onChange(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt]);

  return (
    <div>
      {label && (
        <div className="flex items-center gap-2">
          <label className="text-[15.5px] font-extrabold text-ob-ink flex items-center gap-[5px]">
            {label}
            {required && <span className="text-ob-primary font-extrabold">*</span>}
          </label>
          {hint && <span className="text-[11.8px] font-semibold text-ob-ink-faint">{hint}</span>}
          {value.length > 0 && (
            <span className="ml-auto text-[11px] font-extrabold text-ob-primary-deep bg-ob-primary-softer px-2.5 py-1 rounded-full">
              {value.length}개 선택
            </span>
          )}
        </div>
      )}

      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = value.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              className={`rounded-full border-[1.5px] text-[13.5px] font-bold transition-all duration-150 flex items-center justify-center gap-1.5 ${itemClassName} ${
                selected
                  ? "border-ob-primary bg-gradient-to-b from-ob-primary-soft to-[#FFD3D8] text-ob-primary-text shadow-[inset_0_0_0_1px_rgba(255,107,122,0.3),0_3px_8px_-3px_rgba(219,74,94,0.35)]"
                  : "border-ob-border-strong bg-ob-surface text-ob-ink hover:border-ob-primary hover:-translate-y-[1px]"
              }`}
            >
              {selected && (
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              )}
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
