import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChipSelect, SelectableList, NextButton } from "../components/onboarding";
import loadingBar4 from "../assets/routia-loadingbar4.svg";

export default function Step3Difficulty() {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState<string[]>([]);
  const [timePref, setTimePref] = useState("");

  return (
    <div className="flex min-h-screen flex-col items-start gap-6 px-6 pt-8 pb-6">
      <img src={loadingBar4} alt="진행 상태" className="h-[7px] w-[362px] self-center" />

      <div>
        <h1 className="text-2xl font-bold text-textColor">
          <span className="text-buttonColor">3단계</span> 난이도 설정
        </h1>
        <p className="mt-2 text-sm font-bold text-textColor">
          개인 맞춤 루틴 추천을 위해 난이도를 설정해주세요!
        </p>
        <p className="text-sm text-subtextColor">
          (<span className="text-buttonColor">*</span>항목은 필수 항목입니다)
        </p>
      </div>

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

      <div className="flex-1" />

      <NextButton onClick={() => { console.log("3단계:", { difficulty: difficulty[0], timePref }); navigate("/onboarding"); }}>다음으로</NextButton>
    </div>
  );
}
