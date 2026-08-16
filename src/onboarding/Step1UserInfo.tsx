import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  ChipSelect,
  GenderSelect,
  RegionSelect,
  OnboardingShell,
  type RegionValue,
} from "../components/onboarding";
import femaleIcon from "../assets/routia-gender-female.svg";
import maleIcon from "../assets/routia-gender-male.svg";

export default function Step1UserInfo() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    height: "",
    weight: "",
    age: "",
    gender: "",
    detail: "",
    region: { sido: "", sigungu: "" } as RegionValue,
  });

  const set = (key: "height" | "weight" | "age" | "gender" | "detail") => (v: string) =>
    setForm((prev) => ({ ...prev, [key]: v }));

  return (
    <OnboardingShell
      step={1}
      eyebrow="피부 프로필 만들기"
      title={
        <>
          사용자 정보를
          <br />
          입력해주세요
        </>
      }
      subtitle={
        <>
          개인 맞춤 루틴 추천을 위해 신체 정보를 입력해주세요.{" "}
          <b className="text-ob-ink font-bold">*</b> 표시는 필수 항목이에요.
        </>
      }
      onNext={() => navigate("/onboarding/step2")}
      onBack={() => navigate(-1 as never)}
    >
      {/* 섹션: 신체 정보 */}
      <div className="bg-ob-surface border border-ob-border rounded-ob-lg p-5 shadow-ob-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-[11px] bg-gradient-to-br from-ob-primary-softer to-ob-primary-soft flex items-center justify-center shrink-0">
            <svg
              className="w-4 h-4 stroke-ob-primary-deep"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v20M2 12h20" />
            </svg>
          </div>
          <div>
            <p className="text-[15.5px] font-extrabold text-ob-ink">신체 정보</p>
            <p className="text-[11.8px] text-ob-ink-faint font-semibold">
              키와 몸무게를 입력해주세요
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <TextField
            label="키"
            placeholder="165.5 cm"
            value={form.height}
            onChange={set("height")}
            fullWidth
          />
          <TextField
            label="몸무게"
            placeholder="55.5 kg"
            value={form.weight}
            onChange={set("weight")}
            fullWidth
          />
        </div>
      </div>

      {/* 섹션: 나이 */}
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
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
          </div>
          <div>
            <p className="text-[15.5px] font-extrabold text-ob-ink">나이대</p>
            <p className="text-[11.8px] text-ob-ink-faint font-semibold">연령대를 선택해주세요</p>
          </div>
        </div>
        <ChipSelect
          required
          options={["10대", "20대", "30대", "40대", "50대"]}
          value={form.age}
          onChange={set("age")}
        />
      </div>

      {/* 섹션: 성별 */}
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
              <circle cx="12" cy="8" r="5" />
              <path d="M20 21a8 8 0 0 0-16 0" />
            </svg>
          </div>
          <div>
            <p className="text-[15.5px] font-extrabold text-ob-ink">성별</p>
          </div>
        </div>
        <GenderSelect
          label=""
          options={[
            {
              value: "female",
              label: "여성",
              icon: <img src={femaleIcon} alt="여성" className="h-[50px] w-[50px]" />,
            },
            {
              value: "male",
              label: "남성",
              icon: <img src={maleIcon} alt="남성" className="h-[50px] w-[50px]" />,
            },
          ]}
          value={form.gender}
          onChange={set("gender")}
        />
      </div>

      {/* 섹션: 거주 지역 */}
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
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <div>
            <p className="text-[15.5px] font-extrabold text-ob-ink">거주 지역</p>
            <p className="text-[11.8px] text-ob-ink-faint font-semibold">
              맞춤 서비스를 위한 지역 정보
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-3">
          <RegionSelect
            label=""
            value={form.region}
            onChange={(region) => setForm((prev) => ({ ...prev, region }))}
          />
          <input
            type="text"
            value={form.detail}
            onChange={(e) => set("detail")(e.target.value)}
            placeholder="상세 주소"
            className="h-[50px] w-full rounded-ob-md border-[1.5px] border-ob-border bg-ob-bg px-4 text-[13.5px] font-semibold text-ob-ink placeholder:text-ob-ink-faint placeholder:font-medium focus:border-ob-primary focus:bg-ob-surface focus:outline-none transition-colors"
          />
        </div>
      </div>
    </OnboardingShell>
  );
}
