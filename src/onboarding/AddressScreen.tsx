import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, NextButton } from "../components/onboarding";
import loadingBar2 from "../assets/routia-loadingbar2.svg";

export default function AddressScreen() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ sido: "", si: "", gugun: "", detail: "" });

  const set = (key: keyof typeof form) => (v: string) =>
    setForm((prev) => ({ ...prev, [key]: v }));

  return (
    <div className="flex min-h-screen flex-col items-start gap-6 px-6 pt-8 pb-6">
      <img src={loadingBar2} alt="진행 상태" className="h-[7px] w-[362px] self-center" />

      <div>
        <h1 className="text-2xl font-bold text-textColor">거주지를 입력해주세요</h1>
        <p className="mt-2 text-sm text-textColor">
          정확한 맞춤 서비스를 제공하기 위해 거주지를 입력해주세요!
        </p>
        <p className="text-sm text-gray-400">
          <span className="text-buttonColor">*</span>항목은 필수 항목입니다
        </p>
      </div>

      <TextField label="도" placeholder="도를 적어주세요" value={form.sido} onChange={set("sido")} />
      <TextField label="시" placeholder="시를 적어주세요" value={form.si} onChange={set("si")} />
      <TextField label="군/구" placeholder="군/구를 적어주세요" value={form.gugun} onChange={set("gugun")} />
      <TextField label="상세주소" required={false} placeholder="상세주소를 적어주세요" value={form.detail} onChange={set("detail")} />

      <div className="flex-1" />

      <NextButton onClick={() => { console.log("거주지:", form); navigate("/onboarding"); }}>다음으로</NextButton>
    </div>
  );
}
