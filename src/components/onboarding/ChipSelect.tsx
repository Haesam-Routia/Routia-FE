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
        <label className="text-sm font-semibold text-textColor">
          {label}
          {required && <span className="text-buttonColor">*</span>}
        </label>
      )}

      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange?.(opt)}
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
