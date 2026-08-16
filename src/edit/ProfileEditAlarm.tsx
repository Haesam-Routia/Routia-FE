import { useEffect, useRef, useState } from "react";
import EditLayout from "../components/EditLayout";

const pad = (n: number) => String(n).padStart(2, "0");
const ITEM_H = 36;

function Wheel({ count, value, onChange }: { count: number; value: number; onChange: (n: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const timer = useRef<number>(0);

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = value * ITEM_H;
  }, []);

  const handleScroll = () => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      const el = ref.current!;
      const idx = Math.max(0, Math.min(count - 1, Math.round(el.scrollTop / ITEM_H)));
      el.scrollTo({ top: idx * ITEM_H, behavior: "smooth" });
      if (idx !== value) onChange(idx);
    }, 90);
  };

  return (
    <div
      ref={ref}
      onScroll={handleScroll}
      className="h-[108px] w-[48px] snap-y snap-mandatory overflow-y-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <div style={{ height: ITEM_H }} />
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className={`flex h-[36px] snap-center items-center justify-center text-sm ${
            i === value ? "font-bold text-textColor" : "text-gray-300"
          }`}
        >
          {pad(i)}
        </div>
      ))}
      <div style={{ height: ITEM_H }} />
    </div>
  );
}

function WheelTimePicker({
  time,
  onChange,
}: {
  time: { h: number; m: number };
  onChange: (t: { h: number; m: number }) => void;
}) {
  return (
    <div className="relative flex w-[140px] items-center justify-center rounded-xl border border-lineColor bg-white py-1 shadow-md">
      <div className="pointer-events-none absolute inset-x-2 top-1/2 h-[36px] -translate-y-1/2 rounded-md bg-mainLightColor" />
      <div className="relative flex items-center gap-1">
        <Wheel count={24} value={time.h} onChange={(h) => onChange({ ...time, h })} />
        <span className="text-sm font-bold text-textColor">:</span>
        <Wheel count={60} value={time.m} onChange={(m) => onChange({ ...time, m })} />
      </div>
    </div>
  );
}

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`h-[28px] w-[52px] rounded-full p-[3px] transition-colors ${on ? "bg-buttonColor" : "bg-neutral-300"}`}
    >
      <div className={`h-[22px] w-[22px] rounded-full bg-white transition-transform ${on ? "translate-x-[24px]" : ""}`} />
    </button>
  );
}

function TimeBox({ time, active, onClick }: { time: { h: number; m: number }; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-[36px] w-[70px] rounded-lg border text-sm transition-colors ${
        active ? "border-buttonColor bg-mainLightColor text-buttonColor" : "border-lineColor bg-white text-textColor"
      }`}
    >
      {pad(time.h)}:{pad(time.m)}
    </button>
  );
}

export default function ProfileEditAlarm() {
  const [enabled, setEnabled] = useState(false);
  const [start, setStart] = useState({ h: 0, m: 0 });
  const [end, setEnd] = useState({ h: 0, m: 0 });
  const [open, setOpen] = useState<null | "start" | "end">(null);

  return (
    <EditLayout active="noti">
      <div className="flex w-full items-center justify-between">
        <span className="text-sm font-semibold text-textColor">사용여부</span>
        <Toggle on={enabled} onToggle={() => setEnabled((v) => !v)} />
      </div>

      <div className="flex w-full items-center justify-between">
        <span className="text-sm font-semibold text-textColor">사용시간</span>
        <div className="flex items-center gap-2">
          <TimeBox time={start} active={open === "start"} onClick={() => setOpen(open === "start" ? null : "start")} />
          <span className="text-sm text-textColor">~</span>
          <TimeBox time={end} active={open === "end"} onClick={() => setOpen(open === "end" ? null : "end")} />
        </div>
      </div>

      {open && (
        <div className="flex w-full justify-end">
          <WheelTimePicker
            time={open === "start" ? start : end}
            onChange={(t) => (open === "start" ? setStart(t) : setEnd(t))}
          />
        </div>
      )}
    </EditLayout>
  );
}
