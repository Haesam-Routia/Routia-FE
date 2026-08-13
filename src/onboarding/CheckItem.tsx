import type { ReactNode } from "react";

interface CheckItemProps {
  done: boolean; 
  children: ReactNode;
}

export default function CheckItem({ done, children }: CheckItemProps) {
  return (
    <li className="flex items-center gap-2 text-sm text-neutral-700">
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs text-white ${
          done ? "bg-buttonColor" : "border-2 border-neutral-300"
        }`}
      >
        {done ? "✓" : ""}
      </span>
      {children}
    </li>
  );
}