import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChipSelect,
  MultiChipSelect,
  SelectableList,
  TextField,
  NextButton,
} from "../components/onboarding";
import loadingBar3 from "../assets/routia-loadingbar3.svg";

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
    <div className="flex min-h-screen flex-col items-start gap-6 px-6 pt-8 pb-6">
      <img src={loadingBar3} alt="진행 상태" className="h-[7px] w-[362px] self-center" />

      <div>
        <h1 className="text-2xl font-bold text-textColor">
          <span className="text-buttonColor">2단계</span> 피부 고민 및 니즈
        </h1>
        <p className="mt-2 text-sm font-bold text-textColor">
          개인 맞춤 루틴 추천을 위해 피부 정보 및 니즈를 입력해주세요!
        </p>
        <p className="text-sm text-subtextColor">
          (<span className="text-buttonColor">*</span>항목은 필수 항목입니다)
        </p>
      </div>

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
        placeholder="예) 아누아 어성초 토너, 마데카소이드 메디힐 패드"
        value={form.usedProducts}
        onChange={(v) => update("usedProducts", v)}
      />

      <SelectableList
        label="보유 도구"
        hint="(복수 선택 가능)"
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

      <div className="flex-1" />
      <NextButton onClick={() => { console.log("2단계:", form); navigate("/onboarding/step3"); }}>다음으로</NextButton>
    </div>
  );
}
