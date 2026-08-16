import { useState } from "react";

type Tab = "login" | "signup";

interface AuthTabSwitcherProps {
  defaultTab?: Tab;
  onChange?: (tab: Tab) => void;
}

export default function AuthTabSwitcher({
  defaultTab = "signup",
  onChange,
}: AuthTabSwitcherProps) {
  const [activeTab, setActiveTab] = useState<Tab>(defaultTab);

  const handleSelect = (tab: Tab) => {
    setActiveTab(tab);
    onChange?.(tab);
  };

  return (
    <div className="relative flex w-full rounded-full bg-rose-50 p-1">
      <div
        className={`absolute inset-y-1 w-[calc(50%-8px)] rounded-full bg-buttonColor transition-transform duration-300 ease-out ${
          activeTab === "signup"
            ? "translate-x-[calc(100%+8px)]"
            : "translate-x-0"
        }`}
      />

      <button
        type="button"
        onClick={() => handleSelect("login")}
        className={`relative z-10 flex-1 rounded-full py-4 text-sm font-semibold transition-colors ${
          activeTab === "login" ? "text-white" : "text-buttonColor"
        }`}
      >
        로그인
      </button>

      <button
        type="button"
        onClick={() => handleSelect("signup")}
        className={`relative z-10 flex-1 rounded-full py-4 text-sm font-semibold transition-colors ${
          activeTab === "signup" ? "text-white" : "text-buttonColor"
        }`}
      >
        회원가입
      </button>
    </div>
  );
}
