import type { ReactNode } from "react";

// 입력창
export const inputClass =
  "w-full h-9 px-3 py-6 rounded-[10px] border border-lineColor  " +
  "text-sm text-neutral-900 placeholder:text-neutral-400 " +
  "focus:border-rose-100 focus:bg-white focus:outline-none";

// 인증번호 받기 / 인증하기 버튼
export const sideBtnClass =
  "flex h-9 w-[95px] shrink-0 items-center justify-center whitespace-nowrap " +
  "rounded-[10px] text-xs font-semibold bg-neutral-800 text-white " +
  "disabled:bg-neutral-200 disabled:text-neutral-400";

// 메인 핑크 버튼 (가입하기 / 로그인)
export const primaryBtnClass =
  "w-full rounded-xl py-3.5 text-sm font-semibold text-white transition-colors " +
  "bg-buttonColor hover:brightness-95 disabled:bg-neutral-400";

// 약관 동의 체크박스
export function AgreeItem({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-xs text-neutral-600">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-neutral-300 text-sm font-bold leading-none text-transparent peer-checked:border-transparent peer-checked:text-buttonColor">
        ✓
      </span>
      {children}
    </label>
  );
}
