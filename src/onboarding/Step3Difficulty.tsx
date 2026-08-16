import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChipSelect, SelectableList, OnboardingShell } from "../components/onboarding";

export default function Step3Difficulty() {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState<string[]>([]);
  const [timePref, setTimePref] = useState("");

  return (
    <OnboardingShell
      step={3}
      eyebrow="피부 프로필 만들기"
      title={
        <>
          루틴 난이도를
          <br />
          설정해주세요
        </>
      }
      subtitle={
        <>
          개인 맞춤 루틴 추천을 위해 난이도를 설정해주세요.{" "}
          <b className="text-ob-ink font-bold">*</b> 표시는 필수 항목이에요.
        </>
      }
      onNext={() => {
        console.log("3단계:", { difficulty: difficulty[0], timePref });
        navigate("/onboarding");
      }}
      onBack={() => navigate(-1 as never)}
    >
      {/* 루틴 난이도 */}
      <div className="bg-ob-surface border border-ob-border rounded-ob-lg p-5 shadow-ob-card">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-[11px] bg-gradient-to-br from-ob-primary-softer to-ob-primary-soft flex items-center justify-center shrink-0">
            <svg
              className="w-4 h-4 stroke-ob-primary-deep"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <div>
            <p className="text-[15.5px] font-extrabold text-ob-ink flex items-center gap-1">
              루틴 난이도<span className="text-ob-primary">*</span>
            </p>
            <p className="text-[11.8px] text-ob-ink-faint font-semibold">
              원하는 루틴 복잡도를 선택해주세요
            </p>
          </div>
        </div>
        <SelectableList
          options={[
            {
              value: "complex",
              label: "루틴이 복잡해도 괜찮아요",
              desc: "자세한 단계별 루틴을 원해요 (12개의 루틴 생성)",
            },
            {
              value: "medium",
              label: "루틴이 너무 복잡한건 싫어요",
              desc: "핵심 단계만 간단하게 원해요 (6~7개의 루틴 생성)",
            },
            {
              value: "simple",
              label: "루틴이 단순했으면 좋겠어요",
              desc: "최소한의 루틴만 원해요 (3개의 루틴 생성)",
            },
          ]}
          value={difficulty}
          onChange={setDifficulty}
          itemClassName="w-full py-4"
        />
      </div>

      {/* 루틴 선호 시간대 */}
      <div className="bg-ob-surface border border-ob-border rounded-ob-lg p-5 shadow-ob-card">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-[11px] bg-gradient-to-br from-ob-primary-softer to-ob-primary-soft flex items-center justify-center shrink-0">
            <svg
              className="w-4 h-4 stroke-ob-primary-deep"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
          <div>
            <p className="text-[15.5px] font-extrabold text-ob-ink flex items-center gap-1">
              루틴 선호 시간대<span className="text-ob-primary">*</span>
            </p>
            <p className="text-[11.8px] text-ob-ink-faint font-semibold">
              루틴 수행을 원하는 시간대를 선택하세요
            </p>
          </div>
        </div>
        <ChipSelect
          options={["아침형", "저녁형", "상관없음"]}
          value={timePref}
          onChange={setTimePref}
        />
      </div>
    </OnboardingShell>
  );
}
