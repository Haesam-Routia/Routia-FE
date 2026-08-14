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
  itemClassName = "w-full py-3",
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
        <label className="text-sm font-semibold text-textColor">
          {label}
          {required && <span className="text-buttonColor">*</span>}
          {hint && <span className="ml-1 text-xs font-normal text-gray-400">{hint}</span>}
        </label>
      )}

      <div className="mt-2 flex flex-col gap-2">
        {options.map((opt) => {
          const selected = value.includes(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggle(opt.value)}
              className={`flex flex-col justify-center rounded-xl border px-4 text-left transition-colors ${itemClassName} ${
                selected ? "border-buttonColor bg-mainLightColor" : "border-neutral-200 bg-white"
              }`}
            >
              <p className={`text-sm ${selected ? "font-semibold text-buttonColor" : "text-gray-800"}`}>
                {opt.label}
              </p>
              {opt.desc && (
                <p className={`mt-0.5 text-xs ${selected ? "text-buttonColor" : "text-gray-400"}`}>
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
