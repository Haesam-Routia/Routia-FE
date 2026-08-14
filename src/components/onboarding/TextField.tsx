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
        <label className="text-sm font-semibold text-textColor">
          {label}
          {required && <span className="text-buttonColor">*</span>}
          {hint && <span className="ml-1 text-xs font-normal text-gray-400">{hint}</span>}
        </label>
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className={`mt-2 h-[50px] rounded-xl border border-neutral-200 bg-white px-4 text-gray-800 placeholder:text-gray-400 focus:border-buttonColor focus:bg-inputon focus:outline-none ${
          fullWidth ? "w-full" : "w-[320px]"
        }`}
      />
    </div>
  );
}
