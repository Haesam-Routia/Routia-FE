import { useState } from "react";
import { ChipSelect, MultiChipSelect, TextField } from "../components/onboarding";
import EditLayout from "../components/EditLayout";

export default function ProfileEditSkin() {
  const [form, setForm] = useState({
    skinType: "건성",
    skinConcern: ["탄력", "주름"] as string[],
    usedProducts: "아누아 어성초 토너, 마데카소이드 메디힐 패드",
    bodyConcern: [] as string[],
    bodyConcernEtc: "체중 감소",
    goals: ["현상 유지"] as string[],
    goalsEtc: "규칙적인 생활",
  });

  const update = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  return (
    <EditLayout active="skin">
      <ChipSelect
        label="피부 타입"
        required
        options={["건성", "중성", "지성", "복합성", "민감성", "수부지"]}
        value={form.skinType}
        onChange={(v) => update("skinType", v)}
        itemClassName="w-[60px] h-[41px]"
      />

      <MultiChipSelect
        label="피부 고민"
        required
        hint="(복수 선택 가능)"
        options={["탄력", "주름", "여드름", "색소", "모공", "피지"]}
        value={form.skinConcern}
        onChange={(v) => update("skinConcern", v)}
        itemClassName="w-[60px] h-[41px]"
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
