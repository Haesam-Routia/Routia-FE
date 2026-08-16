import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChipSelect,
  MultiChipSelect,
  SelectableList,
  TextField,
  OnboardingShell,
} from "../components/onboarding";

export default function Step2SkinConcern() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    skinType: "",
    skinConcern: [] as string[],
    usedProducts: "",
    tools: [] as string[],
    bodyConcern: [] as string[],
    bodyConcernEtc: "",
    goals: [] as string[],
    goalsEtc: "",
  });

  const update = <K extends keyof typeof form>(key: K, val: (typeof form)[K]) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  return (
    <OnboardingShell
      step={2}
      eyebrow="피부 프로필 만들기"
      title={<>피부 고민 및<br/>니즈를 알려주세요</>}
      subtitle={<>입력하신 정보로 <b className="text-ob-ink font-bold">나만의 루틴</b>을 설계해요. <b className="text-ob-ink font-bold">*</b> 표시는 필수 항목이에요.</>}
      onNext={() => { console.log("2단계:", form); navigate("/onboarding/step3"); }}
      onBack={() => navigate(-1 as never)}
    >
      {/* 피부 타입 */}
      <div className="bg-ob-surface border border-ob-border rounded-ob-lg p-5 shadow-ob-card">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-[11px] bg-gradient-to-br from-ob-primary-softer to-ob-primary-soft flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 stroke-ob-primary-deep" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.5s7 7.2 7 12.2a7 7 0 1 1-14 0c0-5 7-12.2 7-12.2z"/></svg>
          </div>
          <div>
            <p className="text-[15.5px] font-extrabold text-ob-ink flex items-center gap-1">피부 타입<span className="text-ob-primary">*</span></p>
            <p className="text-[11.8px] text-ob-ink-faint font-semibold">가장 가까운 타입 1개를 선택해주세요</p>
          </div>
        </div>
        <ChipSelect
          options={["건성", "중성", "지성", "복합성", "민감성", "수부지"]}
          value={form.skinType}
          onChange={(v) => update("skinType", v)}
        />
      </div>

      {/* 피부 고민 */}
      <div className="bg-ob-surface border border-ob-border rounded-ob-lg p-5 shadow-ob-card">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-[11px] bg-gradient-to-br from-ob-primary-softer to-ob-primary-soft flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 stroke-ob-primary-deep" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20c4-3 8-6.5 8-11a5 5 0 0 0-9-3 5 5 0 0 0-9 3c0 4.5 6 8 10 11z"/></svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[15.5px] font-extrabold text-ob-ink flex items-center gap-1">피부 고민<span className="text-ob-primary">*</span></p>
            <p className="text-[11.8px] text-ob-ink-faint font-semibold">복수 선택 가능</p>
          </div>
          {form.skinConcern.length > 0 && (
            <span className="text-[11px] font-extrabold text-ob-primary-deep bg-ob-primary-softer px-2.5 py-1 rounded-full shrink-0">
              {form.skinConcern.length}개 선택
            </span>
          )}
        </div>
        <MultiChipSelect
          options={["탄력", "주름", "여드름", "색소", "모공", "피지"]}
          value={form.skinConcern}
          onChange={(v) => update("skinConcern", v)}
        />
      </div>

      {/* 기존 사용 제품 */}
      <div className="bg-ob-surface border border-ob-border rounded-ob-lg p-5 shadow-ob-card">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-[11px] bg-gradient-to-br from-ob-primary-softer to-ob-primary-soft flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 stroke-ob-primary-deep" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 2h6v3.2c0 .5.2 1 .5 1.4l1 1.2c.3.4.5.9.5 1.4V20a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V9.2c0-.5.2-1 .5-1.4l1-1.2c.3-.4.5-.9.5-1.4V2z"/><path d="M7.5 13h9"/></svg>
          </div>
          <div>
            <p className="text-[15.5px] font-extrabold text-ob-ink">기존 사용 제품</p>
            <p className="text-[11.8px] text-ob-ink-faint font-semibold">제품마다 구분해주세요 (선택)</p>
          </div>
        </div>
        <TextField
          required={false}
          fullWidth
          placeholder="예) 아누아 어성초 토너, 마데카소이드 메디힐 패드"
          value={form.usedProducts}
          onChange={(v) => update("usedProducts", v)}
        />
      </div>

      {/* 보유 도구 */}
      <div className="bg-ob-surface border border-ob-border rounded-ob-lg p-5 shadow-ob-card">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-[11px] bg-gradient-to-br from-ob-primary-softer to-ob-primary-soft flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 stroke-ob-primary-deep" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v3M12 18.5v3M4.2 6.2l2.2 2.2M17.6 15.6l2.2 2.2M2.5 12h3M18.5 12h3M4.2 17.8l2.2-2.2M17.6 8.4l2.2-2.2"/></svg>
          </div>
          <div>
            <p className="text-[15.5px] font-extrabold text-ob-ink">보유 도구</p>
            <p className="text-[11.8px] text-ob-ink-faint font-semibold">복수 선택 가능 (선택)</p>
          </div>
        </div>
        <SelectableList
          multiple
          options={[
            { value: "absorb", label: "스킨케어 흡수 디바이스" },
            { value: "body", label: "바디 근막이완 도구" },
            { value: "face", label: "얼굴 근막이완 도구" },
            { value: "peeling", label: "각질 제거 제품" },
          ]}
          value={form.tools}
          onChange={(v) => update("tools", v)}
        />
      </div>

      {/* 신체 고민 */}
      <div className="bg-ob-surface border border-ob-border rounded-ob-lg p-5 shadow-ob-card">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-[11px] bg-gradient-to-br from-ob-primary-softer to-ob-primary-soft flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 stroke-ob-primary-deep" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="2.3"/><path d="M12 8v6M12 14l-4 7M12 14l4 7M8 11l-3 2M16 11l3 2"/></svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[15.5px] font-extrabold text-ob-ink flex items-center gap-1">신체 고민<span className="text-ob-primary">*</span></p>
            <p className="text-[11.8px] text-ob-ink-faint font-semibold">복수 선택 가능</p>
          </div>
          {form.bodyConcern.length > 0 && (
            <span className="text-[11px] font-extrabold text-ob-primary-deep bg-ob-primary-softer px-2.5 py-1 rounded-full shrink-0">
              {form.bodyConcern.length}개 선택
            </span>
          )}
        </div>
        <MultiChipSelect
          options={["붓기", "피로감", "체형 변화", "혈액순환"]}
          value={form.bodyConcern}
          onChange={(v) => update("bodyConcern", v)}
        />
        <div className="mt-3">
          <TextField
            required={false}
            fullWidth
            placeholder="기타 의견을 적어주세요"
            value={form.bodyConcernEtc}
            onChange={(v) => update("bodyConcernEtc", v)}
          />
        </div>
      </div>

      {/* 이루고 싶은 목표 */}
      <div className="bg-ob-surface border border-ob-border rounded-ob-lg p-5 shadow-ob-card">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-[11px] bg-gradient-to-br from-ob-primary-softer to-ob-primary-soft flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 stroke-ob-primary-deep" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.3"/><circle cx="12" cy="12" r="1"/></svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[15.5px] font-extrabold text-ob-ink flex items-center gap-1">이루고 싶은 목표<span className="text-ob-primary">*</span></p>
            <p className="text-[11.8px] text-ob-ink-faint font-semibold">복수 선택 가능</p>
          </div>
          {form.goals.length > 0 && (
            <span className="text-[11px] font-extrabold text-ob-primary-deep bg-ob-primary-softer px-2.5 py-1 rounded-full shrink-0">
              {form.goals.length}개 선택
            </span>
          )}
        </div>
        <MultiChipSelect
          options={["근성장", "현상 유지", "체지방 줄이기", "습관 잡기"]}
          value={form.goals}
          onChange={(v) => update("goals", v)}
        />
        <div className="mt-3">
          <TextField
            required={false}
            fullWidth
            placeholder="기타 의견을 적어주세요"
            value={form.goalsEtc}
            onChange={(v) => update("goalsEtc", v)}
          />
        </div>
      </div>
    </OnboardingShell>
  );
}
