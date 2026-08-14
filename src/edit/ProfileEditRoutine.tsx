import { useState } from "react";
import { ChipSelect, SelectableList } from "../components/onboarding";
import EditLayout from "../components/EditLayout";

export default function ProfileEditRoutine() {
  const [difficulty, setDifficulty] = useState<string[]>(["medium"]);
  const [timePref, setTimePref] = useState("저녁형");

  return (
    <EditLayout active="routine">
      <SelectableList
        label="루틴 난이도"
        required
        options={[
          { value: "complex", label: "루틴이 복잡해도 괜찮아요", desc: "자세한 단계별 루틴을 원해요 (12개의 루틴 생성)" },
          { value: "medium", label: "루틴이 너무 복잡한건 싫어요", desc: "핵심 단계만 간단하게 원해요 (6~7개의 루틴 생성)" },
          { value: "simple", label: "루틴이 단순했으면 좋겠어요", desc: "최소한의 루틴만 원해요 (3개의 루틴 생성)" },
        ]}
        value={difficulty}
        onChange={setDifficulty}
        itemClassName="w-[359px] h-[60px]"
      />

      <ChipSelect
        label="루틴 선호 시간대"
        required
        options={["아침형", "저녁형", "상관없음"]}
        value={timePref}
        onChange={setTimePref}
        itemClassName="px-4 h-[41px]"
      />
    </EditLayout>
  );
}
