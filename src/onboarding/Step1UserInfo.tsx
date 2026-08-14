import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, ChipSelect, GenderSelect, NextButton, RegionSelect, type RegionValue } from "../components/onboarding";
import loadingBar2 from "../assets/routia-loadingbar2.svg";
import femaleIcon from "../assets/routia-gender-female.svg";
import maleIcon from "../assets/routia-gender-male.svg";

export default function Step1UserInfo() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    height: "", weight: "", age: "", gender: "", detail: "",
    region: { sido: "", sigungu: "" } as RegionValue,
  });

  const set = (key: "height" | "weight" | "age" | "gender" | "detail") => (v: string) =>
    setForm((prev) => ({ ...prev, [key]: v }));

  return (
    <div className="flex min-h-screen flex-col items-start gap-6 px-6 pt-8 pb-6">
      <img src={loadingBar2} alt="진행 상태" className="h-[7px] w-[362px] self-center" />

      <div>
        <h1 className="text-2xl font-bold text-textColor">
          <span className="text-buttonColor">1단계</span> 사용자 정보
        </h1>
        <p className="mt-2 whitespace-nowrap text-sm font-bold text-textColor">
          개인 맞춤 루틴 추천을 위해 신체 정보를 입력해주세요!
        </p>
        <p className="text-sm text-subtextColor">
          <span className="text-buttonColor">*</span>항목은 필수 항목입니다
        </p>
      </div>

      <TextField label="키" placeholder="165.5 cm" value={form.height} onChange={set("height")} />
      <TextField label="몸무게" placeholder="55.5 kg" value={form.weight} onChange={set("weight")} />

      <ChipSelect
        label="나이"
        required
        options={["10대", "20대", "30대", "40대", "50대"]}
        value={form.age}
        onChange={set("age")}
        itemClassName="w-[60px] h-[41px]"
      />

      <GenderSelect
        options={[
          { value: "female", label: "여성", icon: <img src={femaleIcon} alt="여성" className="h-[50px] w-[50px]" /> },
          { value: "male", label: "남성", icon: <img src={maleIcon} alt="남성" className="h-[50px] w-[50px]" /> },
        ]}
        value={form.gender}
        onChange={set("gender")}
      />

      <div className="flex flex-col gap-3">
        <RegionSelect
          value={form.region}
          onChange={(region) => setForm((prev) => ({ ...prev, region }))}
        />
        <input
          type="text"
          value={form.detail}
          onChange={(e) => set("detail")(e.target.value)}
          placeholder="상세 주소"
          className="h-[38px] w-[320px] rounded-xl border border-neutral-200 bg-white px-4 text-gray-800 placeholder:text-gray-400 focus:border-buttonColor focus:bg-inputon focus:outline-none"
        />
      </div>

      <div className="flex-1" />
      <NextButton onClick={() => navigate("/onboarding/step2")}>다음으로</NextButton>
    </div>
  );
}
