import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BODY_CONCERN_BY_LABEL,
  BODY_GOAL_BY_LABEL,
  OWNED_TOOL_BY_VALUE,
  SKIN_CONCERN_BY_LABEL,
  SKIN_TYPE_BY_LABEL,
  mapLabels,
  submitOnboardingStep2,
} from "../api";
import { tryApi } from "../api/netguard";
import { patchDraft } from "../store/onboardingDraft";

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

  const toggleMulti = (key: "skinConcern" | "bodyConcern" | "goals" | "tools", val: string) => {
    const arr = form[key] as string[];
    update(key, arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  const skinTypes = ["건성", "중성", "지성", "복합성", "민감성", "수부지"];
  const skinConcerns = ["탄력", "주름", "여드름", "색소", "모공", "피지"];
  const toolOptions = [
    { value: "absorb", label: "스킨케어 흡수 디바이스" },
    { value: "body", label: "바디 근막이완 도구" },
    { value: "face", label: "얼굴 근막이완 도구" },
    { value: "peeling", label: "각질 제거 제품" },
  ];
  const bodyConcerns = ["붓기", "피로감", "체형 변화", "혈액순환"];
  const goalOptions = ["근성장", "현상 유지", "체지방 줄이기", "습관 잡기"];

  const handleNext = async () => {
    const mappedGoals = mapLabels(form.goals, BODY_GOAL_BY_LABEL).slice(0, 3);
    // bodyGoals 는 최소 1개 필요 — 미선택 시 기본값 보정
    const bodyGoals = mappedGoals.length > 0 ? mappedGoals : ["BUILD_HABIT" as const];
    const payload = {
      skinType: SKIN_TYPE_BY_LABEL[form.skinType] ?? ("NORMAL" as const),
      skinConcerns: mapLabels(form.skinConcern, SKIN_CONCERN_BY_LABEL).slice(0, 3),
      ownedTools: mapLabels(form.tools, OWNED_TOOL_BY_VALUE).slice(0, 4),
      bodyConcerns: mapLabels(form.bodyConcern, BODY_CONCERN_BY_LABEL).slice(0, 3),
      bodyGoals,
    };
    patchDraft(payload);
    await tryApi(() => submitOnboardingStep2(payload), null);
    navigate("/onboarding/step3");
  };

  return (
    <div className="relative flex w-full flex-col bg-white min-h-screen">
      {/* 상단 네비 */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-2 shrink-0">
        <button
          type="button"
          onClick={() => navigate(-1 as never)}
          className="w-8 h-8 flex items-center justify-center"
        >
          <svg className="w-5 h-5 text-textColor" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="flex-1 h-1 rounded-full bg-neutral-100 overflow-hidden">
          <div className="h-full w-2/4 rounded-full bg-buttonColor transition-all duration-500" />
        </div>
        <span className="text-xs font-medium text-subtextColor">2/4</span>
      </div>

      {/* 타이틀 */}
      <div className="px-6 pt-4 pb-2">
        <h1 className="text-[22px] font-bold text-textColor leading-snug">
          피부 고민 및 니즈를 알려주세요
        </h1>
        <p className="mt-1.5 text-[13px] text-subtextColor">
          맞춤 루틴 설계를 위한 정보예요
        </p>
      </div>

      {/* 콘텐츠 */}
      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-[100px]">
        <div className="flex flex-col gap-7">
          {/* 피부 타입 */}
          <div>
            <p className="text-[13px] font-semibold text-textColor mb-2.5">
              피부 타입 <span className="text-buttonColor">*</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {skinTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => update("skinType", type)}
                  className={`h-9 px-4 rounded-full text-[13px] font-semibold transition-all active:scale-95 ${
                    form.skinType === type
                      ? "bg-buttonColor text-white shadow-sm"
                      : "bg-neutral-50 text-subtextColor border border-neutral-200"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* 피부 고민 */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <p className="text-[13px] font-semibold text-textColor">
                피부 고민 <span className="text-buttonColor">*</span>
              </p>
              {form.skinConcern.length > 0 && (
                <span className="text-[11px] font-bold text-buttonColor">{form.skinConcern.length}개 선택</span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {skinConcerns.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleMulti("skinConcern", item)}
                  className={`h-9 px-4 rounded-full text-[13px] font-semibold transition-all active:scale-95 ${
                    form.skinConcern.includes(item)
                      ? "bg-buttonColor text-white shadow-sm"
                      : "bg-neutral-50 text-subtextColor border border-neutral-200"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* 기존 사용 제품 */}
          <div>
            <p className="text-[13px] font-semibold text-textColor mb-2.5">
              기존 사용 제품 <span className="text-subtextColor font-normal">(선택)</span>
            </p>
            <input
              type="text"
              value={form.usedProducts}
              onChange={(e) => update("usedProducts", e.target.value)}
              placeholder="예) 아누아 어성초 토너, 메디힐 패드"
              className="h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-textColor placeholder:text-neutral-400 focus:border-buttonColor focus:outline-none transition-colors"
            />
          </div>

          {/* 보유 도구 */}
          <div>
            <p className="text-[13px] font-semibold text-textColor mb-2.5">
              보유 도구 <span className="text-subtextColor font-normal">(선택)</span>
            </p>
            <div className="flex flex-col gap-2">
              {toolOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => toggleMulti("tools", opt.value)}
                  className={`h-11 w-full rounded-xl border px-4 text-left text-[13px] font-semibold transition-all active:scale-[0.98] ${
                    form.tools.includes(opt.value)
                      ? "border-buttonColor bg-[#FFF1F3] text-buttonColor"
                      : "border-neutral-200 bg-white text-textColor"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* 신체 고민 */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <p className="text-[13px] font-semibold text-textColor">
                신체 고민 <span className="text-buttonColor">*</span>
              </p>
              {form.bodyConcern.length > 0 && (
                <span className="text-[11px] font-bold text-buttonColor">{form.bodyConcern.length}개 선택</span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {bodyConcerns.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleMulti("bodyConcern", item)}
                  className={`h-9 px-4 rounded-full text-[13px] font-semibold transition-all active:scale-95 ${
                    form.bodyConcern.includes(item)
                      ? "bg-buttonColor text-white shadow-sm"
                      : "bg-neutral-50 text-subtextColor border border-neutral-200"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={form.bodyConcernEtc}
              onChange={(e) => update("bodyConcernEtc", e.target.value)}
              placeholder="기타 의견 (선택)"
              className="mt-2.5 h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-textColor placeholder:text-neutral-400 focus:border-buttonColor focus:outline-none transition-colors"
            />
          </div>

          {/* 이루고 싶은 목표 */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <p className="text-[13px] font-semibold text-textColor">
                이루고 싶은 목표 <span className="text-buttonColor">*</span>
              </p>
              {form.goals.length > 0 && (
                <span className="text-[11px] font-bold text-buttonColor">{form.goals.length}개 선택</span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {goalOptions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleMulti("goals", item)}
                  className={`h-9 px-4 rounded-full text-[13px] font-semibold transition-all active:scale-95 ${
                    form.goals.includes(item)
                      ? "bg-buttonColor text-white shadow-sm"
                      : "bg-neutral-50 text-subtextColor border border-neutral-200"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={form.goalsEtc}
              onChange={(e) => update("goalsEtc", e.target.value)}
              placeholder="기타 의견 (선택)"
              className="mt-2.5 h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-textColor placeholder:text-neutral-400 focus:border-buttonColor focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="absolute left-0 right-0 bottom-0 px-6 pb-8 pt-4 bg-gradient-to-t from-white via-white to-transparent">
        <button
          type="button"
          onClick={handleNext}
          className="w-full h-14 bg-buttonColor rounded-xl flex justify-center items-center cursor-pointer hover:opacity-90 active:scale-[0.98] transition-all"
        >
          <span className="text-white text-base font-semibold">다음으로</span>
        </button>
      </div>
    </div>
  );
}
