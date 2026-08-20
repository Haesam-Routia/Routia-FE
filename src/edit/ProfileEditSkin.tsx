import { useEffect, useState } from "react";
import { ChipSelect, MultiChipSelect, TextField } from "../components/onboarding";
import EditLayout from "../components/EditLayout";
import {
  BODY_CONCERN_BY_LABEL,
  BODY_CONCERN_LABEL_BY_CODE,
  BODY_GOAL_BY_LABEL,
  BODY_GOAL_LABEL_BY_CODE,
  OWNED_TOOL_BY_LABEL,
  OWNED_TOOL_LABEL_BY_CODE,
  SKIN_CONCERN_BY_LABEL,
  SKIN_CONCERN_LABEL_BY_CODE,
  SKIN_TYPE_BY_LABEL,
  SKIN_TYPE_LABEL_BY_CODE,
  getCurrentUserId,
  getNeeds,
  mapCodesToLabels,
  mapLabels,
  updateNeeds,
  type NeedsUpdateRequest,
} from "../api";
import { tryApi } from "../api/netguard";

export default function ProfileEditSkin() {
  const [form, setForm] = useState({
    skinType: "",
    skinConcern: [] as string[],
    ownedTools: [] as string[],
    usedProducts: "", // API에 대응 필드 없음 — 화면 전용
    bodyConcern: [] as string[],
    bodyConcernEtc: "",
    goals: [] as string[],
    goalsEtc: "",
  });

  const update = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  useEffect(() => {
    const userId = getCurrentUserId();
    if (userId == null) return;
    void tryApi(() => getNeeds(userId), null).then((n) => {
      if (!n) return;
      setForm((prev) => ({
        ...prev,
        skinType: n.skinType ? (SKIN_TYPE_LABEL_BY_CODE[n.skinType] ?? prev.skinType) : prev.skinType,
        skinConcern: mapCodesToLabels(n.skinConcerns, SKIN_CONCERN_LABEL_BY_CODE),
        ownedTools: mapCodesToLabels(n.ownedTools, OWNED_TOOL_LABEL_BY_CODE),
        bodyConcern: mapCodesToLabels(n.bodyConcerns, BODY_CONCERN_LABEL_BY_CODE),
        goals: mapCodesToLabels(n.bodyGoals, BODY_GOAL_LABEL_BY_CODE),
      }));
    });
  }, []);

  const handleSave = async () => {
    const userId = getCurrentUserId();
    if (userId == null) return;
    const goals = mapLabels(form.goals, BODY_GOAL_BY_LABEL).slice(0, 3);
    const body: NeedsUpdateRequest = {
      skinConcerns: mapLabels(form.skinConcern, SKIN_CONCERN_BY_LABEL).slice(0, 3),
      bodyConcerns: mapLabels(form.bodyConcern, BODY_CONCERN_BY_LABEL).slice(0, 3),
      bodyGoals: goals.length > 0 ? goals : ["BUILD_HABIT"],
      ownedTools: mapLabels(form.ownedTools, OWNED_TOOL_BY_LABEL).slice(0, 4),
    };
    if (form.skinType && SKIN_TYPE_BY_LABEL[form.skinType]) {
      body.skinType = SKIN_TYPE_BY_LABEL[form.skinType];
    }
    await tryApi(() => updateNeeds(userId, body), null);
  };

  return (
    <EditLayout active="skin" onSave={handleSave}>
      <ChipSelect
        label="피부 타입"
        required
        options={["건성", "중성", "지성", "복합성", "민감성", "수부지"]}
        value={form.skinType}
        onChange={(v) => update("skinType", v)}
        itemClassName="w-[72px] h-[41px]"
      />

      <MultiChipSelect
        label="피부 고민"
        required
        hint="(복수 선택 가능)"
        options={["탄력", "주름", "여드름", "색소", "모공", "피지"]}
        value={form.skinConcern}
        onChange={(v) => update("skinConcern", v)}
        itemClassName="w-[72px] h-[41px]"
      />

      <MultiChipSelect
        label="보유 도구"
        hint="(복수 선택 가능, 최대 4개)"
        options={["스킨케어 흡수 디바이스", "바디 근막이완 도구", "얼굴 근막이완 도구", "각질 제거 제품"]}
        value={form.ownedTools}
        onChange={(v) => update("ownedTools", v)}
      />

      <TextField
        label="기존 사용 제품"
        hint="(제품마다 구분 해주세요)"
        required={false}
        fullWidth
        value={form.usedProducts}
        onChange={(v) => update("usedProducts", v)}
      />

      <div className="flex w-full flex-col gap-2">
        <MultiChipSelect
          label="신체 고민"
          required
          hint="(복수 선택 가능)"
          options={["붓기", "피로감", "체형 변화", "혈액순환"]}
          value={form.bodyConcern}
          onChange={(v) => update("bodyConcern", v)}
        />
        <TextField
          required={false}
          fullWidth
          placeholder="기타 의견을 적어주세요"
          value={form.bodyConcernEtc}
          onChange={(v) => update("bodyConcernEtc", v)}
        />
      </div>

      <div className="flex w-full flex-col gap-2">
        <MultiChipSelect
          label="이루고 싶은 목표"
          required
          hint="(복수 선택 가능)"
          options={["근성장", "현상 유지", "체지방 줄이기", "습관 잡기"]}
          value={form.goals}
          onChange={(v) => update("goals", v)}
        />
        <TextField
          required={false}
          fullWidth
          placeholder="기타 의견을 적어주세요"
          value={form.goalsEtc}
          onChange={(v) => update("goalsEtc", v)}
        />
      </div>
    </EditLayout>
  );
}
