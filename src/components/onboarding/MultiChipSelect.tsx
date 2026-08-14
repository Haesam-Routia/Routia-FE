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
  itemClassName = "px-4 h-[41px]",
}: MultiChipSelectProps) {
  const toggle = (opt: string) =>
    onChange(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt]);

  return (
    <div>
      {label && (
        <label className="text-sm font-semibold text-textColor">
          {label}
          {required && <span className="text-buttonColor">*</span>}
          {hint && <span className="ml-1 text-xs font-normal text-gray-400">{hint}</span>}
        </label>
      )}

      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = value.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              className={`rounded-xl border text-sm transition-colors ${itemClassName} ${
                selected
                  ? "border-buttonColor bg-mainLightColor font-semibold text-buttonColor"
                  : "border-neutral-200 bg-white text-gray-700"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
