export interface SelectableOption {
  value: string;
  label: string;
  desc?: string;
}

interface SelectableListProps {
  label?: string;
  required?: boolean;
  hint?: string;
  options: SelectableOption[];
  /** true면 복수 선택, false면 단일 선택 */
  multiple?: boolean;
  value: string[];
  onChange: (v: string[]) => void;
  /** 각 항목 크기 (기본 전체폭). 예: "w-[359px] h-[60px]" */
  itemClassName?: string;
}

export default function SelectableList({
  label,
  required = false,
  hint,
  options,
  multiple = false,
  value,
  onChange,
  itemClassName = "w-full py-3.5",
}: SelectableListProps) {
  const toggle = (val: string) => {
    if (multiple) {
      onChange(value.includes(val) ? value.filter((v) => v !== val) : [...value, val]);
    } else {
      onChange(value[0] === val ? [] : [val]);
    }
  };

  return (
    <div className="w-full">
      {label && (
        <div className="flex items-center gap-2">
          <label className="text-[15.5px] font-extrabold text-ob-ink flex items-center gap-[5px]">
            {label}
            {required && <span className="text-ob-primary font-extrabold">*</span>}
          </label>
          {hint && <span className="text-[11.8px] font-semibold text-ob-ink-faint">{hint}</span>}
        </div>
      )}

      <div className="mt-3 flex flex-col gap-2.5">
        {options.map((opt) => {
          const selected = value.includes(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggle(opt.value)}
              className={`flex flex-col justify-center rounded-ob-lg border-[1.5px] px-5 text-left transition-all duration-150 ${itemClassName} ${
                selected
                  ? "border-ob-primary bg-gradient-to-b from-ob-primary-softer to-ob-primary-soft shadow-ob-card"
                  : "border-ob-border bg-ob-surface hover:border-ob-primary hover:-translate-y-[1px]"
              }`}
            >
              <p className={`text-[14px] font-bold ${selected ? "text-ob-primary-text" : "text-ob-ink"}`}>
                {opt.label}
              </p>
              {opt.desc && (
                <p className={`mt-0.5 text-[12px] ${selected ? "text-ob-primary-deep" : "text-ob-ink-faint"}`}>
                  {opt.desc}
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
