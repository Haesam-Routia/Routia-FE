import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, OnboardingShell } from "../components/onboarding";

export default function AddressScreen() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ sido: "", si: "", gugun: "", detail: "" });

  const set = (key: keyof typeof form) => (v: string) =>
    setForm((prev) => ({ ...prev, [key]: v }));

  return (
    <OnboardingShell
      step={1}
      eyebrow="피부 프로필 만들기"
      title={<>거주지를<br/>입력해주세요</>}
      subtitle={<>정확한 맞춤 서비스를 제공하기 위해 거주지를 입력해주세요. <b className="text-ob-ink font-bold">*</b> 표시는 필수 항목이에요.</>}
      onNext={() => { console.log("거주지:", form); navigate("/onboarding"); }}
      onBack={() => navigate(-1 as never)}
    >
      {/* 섹션: 거주지 입력 */}
      <div className="bg-ob-surface border border-ob-border rounded-ob-lg p-5 shadow-ob-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-[11px] bg-gradient-to-br from-ob-primary-softer to-ob-primary-soft flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 stroke-ob-primary-deep" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <div>
            <p className="text-[15.5px] font-extrabold text-ob-ink">주소 정보</p>
            <p className="text-[11.8px] text-ob-ink-faint font-semibold">아래 항목을 입력해주세요</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <TextField label="도" placeholder="도를 적어주세요" value={form.sido} onChange={set("sido")} fullWidth />
          <TextField label="시" placeholder="시를 적어주세요" value={form.si} onChange={set("si")} fullWidth />
          <TextField label="군/구" placeholder="군/구를 적어주세요" value={form.gugun} onChange={set("gugun")} fullWidth />
          <TextField label="상세주소" required={false} placeholder="상세주소를 적어주세요" value={form.detail} onChange={set("detail")} fullWidth />
        </div>
      </div>
    </OnboardingShell>
  );
}
