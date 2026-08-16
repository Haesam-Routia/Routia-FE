import { useNavigate } from "react-router-dom";

const TABS = [
  { key: "body", label: "신체", path: "/edit/body" },
  { key: "skin", label: "피부&니즈", path: "/edit/skin" },
  { key: "routine", label: "루틴", path: "/edit/routine" },
  { key: "noti", label: "알림", path: "/edit/notification" },
];

export default function InfoEditTabs({ active }: { active: string }) {
  const navigate = useNavigate();
  return (
    <div className="flex gap-2">
      {TABS.map((t) => (
        <button
          key={t.key}
          type="button"
          onClick={() => navigate(t.path)}
          className={`h-[41px] rounded-xl border px-4 text-sm transition-colors ${
            active === t.key
              ? "border-editbuttonBorder bg-editbuttonColor font-semibold text-text"
              : "border-lineColor bg-white text-gray-700"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
