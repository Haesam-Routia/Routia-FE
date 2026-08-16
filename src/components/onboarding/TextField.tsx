interface TextFieldProps {
  label?: string;
  required?: boolean;
  hint?: string;
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
  fullWidth?: boolean;
}

export default function TextField({
  label,
  required = true,
  hint,
  placeholder,
  value,
  onChange,
  fullWidth = false,
}: TextFieldProps) {
  return (
    <div className={`flex flex-col ${fullWidth ? "w-full" : ""}`}>
      {label && (
        <label className="text-[15.5px] font-extrabold text-ob-ink flex items-center gap-[5px]">
          {label}
          {required && <span className="text-ob-primary font-extrabold">*</span>}
          {hint && (
            <span className="ml-1 text-[11.8px] font-semibold text-ob-ink-faint">{hint}</span>
          )}
        </label>
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className={`mt-3 h-[50px] rounded-ob-md border-[1.5px] border-ob-border bg-ob-bg px-4 text-[13.5px] font-semibold text-ob-ink placeholder:text-ob-ink-faint placeholder:font-medium focus:border-ob-primary focus:bg-ob-surface focus:outline-none transition-colors ${
          fullWidth ? "w-full" : "w-[320px]"
        }`}
      />
    </div>
  );
}
