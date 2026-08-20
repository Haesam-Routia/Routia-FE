import { useEffect, useRef, useState } from "react";
import EditLayout from "../components/EditLayout";
import {
  getCurrentUserId,
  getNotificationSettings,
  updateNotificationSettings,
} from "../api";
import { registerPushDevice, deactivatePushDevice } from "../api/notifications";
import { tryApi } from "../api/netguard";
import { requestFcmToken } from "../firebase";

const pad = (n: number) => String(n).padStart(2, "0");
const ITEM_H = 40;

function Wheel({
  items,
  value,
  onChange,
}: {
  items: string[];
  value: number;
  onChange: (idx: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const timer = useRef<number>(0);
  const initialized = useRef(false);

  useEffect(() => {
    if (ref.current && !initialized.current) {
      ref.current.scrollTop = value * ITEM_H;
      initialized.current = true;
    }
  }, [value]);

  const handleScroll = () => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      const el = ref.current!;
      const idx = Math.max(0, Math.min(items.length - 1, Math.round(el.scrollTop / ITEM_H)));
      el.scrollTo({ top: idx * ITEM_H, behavior: "smooth" });
      if (idx !== value) onChange(idx);
    }, 90);
  };

  return (
    <div
      ref={ref}
      onScroll={handleScroll}
      className="h-[120px] w-[52px] snap-y snap-mandatory overflow-y-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <div style={{ height: ITEM_H }} />
      {items.map((label, i) => (
        <div
          key={i}
          className={`flex h-[40px] snap-center items-center justify-center text-lg ${
            i === value ? "font-bold text-textColor" : "text-gray-300"
          }`}
        >
          {label}
        </div>
      ))}
      <div style={{ height: ITEM_H }} />
    </div>
  );
}

const HOURS_12 = Array.from({ length: 12 }, (_, i) => pad(i === 0 ? 12 : i));
const MINUTES = Array.from({ length: 60 }, (_, i) => pad(i));
const AMPM = ["AM", "PM"];

function TimePickerSheet({
  time,
  onChange,
  onClose,
}: {
  time: { h: number; m: number };
  onChange: (t: { h: number; m: number }) => void;
  onClose: () => void;
}) {
  // 24시간 → 12시간 AM/PM 변환
  const isPm = time.h >= 12;
  const hour12 = time.h % 12; // 0~11 (0 = 12시)
  const [ampmIdx, setAmpmIdx] = useState(isPm ? 1 : 0);
  const [hourIdx, setHourIdx] = useState(hour12);
  const [minuteIdx, setMinuteIdx] = useState(time.m);

  const handleConfirm = () => {
    // 12시간 → 24시간 변환
    let h24 = hourIdx; // 0=12, 1=1, ..., 11=11
    if (ampmIdx === 1) h24 += 12; // PM
    if (hourIdx === 0 && ampmIdx === 0) h24 = 0; // 12 AM = 0
    if (hourIdx === 0 && ampmIdx === 1) h24 = 12; // 12 PM = 12
    onChange({ h: h24, m: minuteIdx });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center">
      <button
        type="button"
        aria-label="닫기"
        onClick={onClose}
        className="absolute inset-0 bg-black/30"
      />
      <div className="relative w-full max-w-[402px] rounded-t-2xl bg-white px-6 pb-6 pt-5 shadow-lg">
        <p className="text-sm font-semibold text-textColor mb-1">시간 선택</p>
        <p className="text-xs text-subtextColor mb-4">루틴 알림을 받을 시간을 설정해주세요</p>

        <div className="relative flex items-center justify-center gap-2 rounded-xl border border-lineColor bg-white py-3">
          {/* 선택 하이라이트 */}
          <div className="pointer-events-none absolute inset-x-4 top-1/2 h-[40px] -translate-y-1/2 rounded-lg bg-mainLightColor" />
          <div className="relative flex items-center gap-3">
            <Wheel items={HOURS_12} value={hourIdx} onChange={setHourIdx} />
            <Wheel items={MINUTES} value={minuteIdx} onChange={setMinuteIdx} />
            <Wheel items={AMPM} value={ampmIdx} onChange={setAmpmIdx} />
          </div>
        </div>

        <button
          type="button"
          onClick={handleConfirm}
          className="mt-5 flex h-12 w-full items-center justify-center rounded-xl bg-buttonColor text-sm font-semibold text-white"
        >
          확인
        </button>
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
      <div
        className={`h-[22px] w-[22px] rounded-full bg-white transition-transform ${on ? "translate-x-[24px]" : ""}`}
      />
    </button>
  );
}

function formatTime12(h: number, m: number): string {
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${pad(h12)}:${pad(m)} ${ampm}`;
}

export default function ProfileEditAlarm() {
  const [enabled, setEnabled] = useState(false);
  const [start, setStart] = useState({ h: 9, m: 0 });
  const [pickerOpen, setPickerOpen] = useState(false);
  const [deviceId, setDeviceId] = useState<number | null>(null);

  // 서버 알림설정 로드
  useEffect(() => {
    const userId = getCurrentUserId();
    if (userId == null) return;
    void tryApi(() => getNotificationSettings(userId), null).then((s) => {
      if (!s) return;
      setEnabled(s.notificationEnabled);
      if (s.notificationTime) {
        const [h, m] = s.notificationTime.split(":").map(Number);
        if (Number.isFinite(h) && Number.isFinite(m)) setStart({ h, m });
      }
    });

    // 저장된 deviceId 복원
    try {
      const saved = localStorage.getItem("routia.pushDeviceId");
      if (saved) setDeviceId(Number(saved));
    } catch { /* 무시 */ }
  }, []);

  const handleToggle = async () => {
    const userId = getCurrentUserId();
    const newEnabled = !enabled;
    setEnabled(newEnabled);

    if (userId == null) return;

    if (newEnabled) {
      // 알림 ON → FCM 토큰 획득 → 기기 등록
      const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY ?? "";
      console.log("[Routia] FCM 토큰 요청 시작, vapidKey:", vapidKey ? "설정됨" : "없음");
      const token = await requestFcmToken(vapidKey);
      console.log("[Routia] FCM 토큰 결과:", token ? "성공" : "실패(null)");
      if (token) {
        try {
          const res = await registerPushDevice(userId, {
            installationId: token,
            platform: "WEB",
          });
          console.log("[Routia] 기기 등록 성공, deviceId:", res.id);
          setDeviceId(res.id);
          try { localStorage.setItem("routia.pushDeviceId", String(res.id)); } catch { /* */ }
        } catch (err) {
          console.error("[Routia] 기기 등록 실패:", err);
        }
      }
    } else {
      // 알림 OFF → 기기 비활성화
      if (deviceId != null) {
        try {
          await deactivatePushDevice(userId, deviceId);
          setDeviceId(null);
          try { localStorage.removeItem("routia.pushDeviceId"); } catch { /* */ }
        } catch {
          /* 비활성화 실패 시 무시 */
        }
      }
    }
  };

  const handleSave = async () => {
    const userId = getCurrentUserId();
    if (userId == null) return;
    await tryApi(
      () =>
        updateNotificationSettings(userId, {
          notificationEnabled: enabled,
          notificationTime: enabled ? `${pad(start.h)}:${pad(start.m)}` : null,
        }),
      null,
    );
  };

  return (
    <EditLayout active="noti" onSave={handleSave}>
      {/* 사용여부 */}
      <div className="flex w-full items-center justify-between">
        <span className="text-sm font-semibold text-textColor">사용여부</span>
        <Toggle on={enabled} onToggle={handleToggle} />
      </div>
      <p className="text-xs text-subtextColor -mt-2">루틴 알림을 받을지 선택해주세요</p>

      {/* 시간 설정 (사용여부 ON일 때만) */}
      {enabled && (
        <>
          <div className="mt-4">
            <p className="text-sm font-semibold text-textColor">몇 시에 루틴을 보내드릴까요?</p>
            <p className="text-xs text-subtextColor mt-1">
              원하는 시간을 선택하면 매일 해당 시간에{"\n"}루틴 알림을 보내드려요
            </p>
          </div>

          <button
            type="button"
            onClick={() => setPickerOpen(true)}
            className="mt-3 flex h-[44px] w-full items-center justify-between rounded-xl border border-lineColor bg-white px-4"
          >
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-subtextColor" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              <span className="text-sm text-textColor">{formatTime12(start.h, start.m)}</span>
            </div>
            <svg className="h-4 w-4 text-subtextColor" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </>
      )}

      {/* 시간 선택 바텀시트 */}
      {pickerOpen && (
        <TimePickerSheet
          time={start}
          onChange={setStart}
          onClose={() => setPickerOpen(false)}
        />
      )}
    </EditLayout>
  );
}
