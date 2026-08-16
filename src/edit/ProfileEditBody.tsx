import { useState } from "react";
import {
  TextField,
  ChipSelect,
  GenderSelect,
  RegionSelect,
  type RegionValue,
} from "../components/onboarding";
import EditLayout from "../components/EditLayout";
import profileImg from "../assets/routia-profile.svg";
import femaleIcon from "../assets/routia-gender-female.svg";
import maleIcon from "../assets/routia-gender-male.svg";

export default function ProfileEditBody() {
  const [form, setForm] = useState({
    name: "박시은",
    height: "165.5 cm",
    weight: "55.5 kg",
    age: "30대",
    gender: "female",
    region: { sido: "경기도", sigungu: "용인시" } as RegionValue,
    detail: "",
  });

  const set =
    (k: "name" | "height" | "weight" | "age" | "gender" | "detail") =>
    (v: string) =>
      setForm((p) => ({ ...p, [k]: v }));

  return (
    <EditLayout active="body">
      <img src={profileImg} alt="프로필" className="h-[100px] w-[100px] self-center" />

      <TextField label="이름" required={false} value={form.name} onChange={set("name")} />
      <TextField label="키" required={false} value={form.height} onChange={set("height")} />
      <TextField label="몸무게" required={false} value={form.weight} onChange={set("weight")} />

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

      <div className="flex w-full flex-col gap-3">
        <RegionSelect value={form.region} onChange={(region) => setForm((p) => ({ ...p, region }))} />
        <input
          type="text"
          value={form.detail}
          onChange={(e) => set("detail")(e.target.value)}
          placeholder="상세 주소"
          className="h-[38px] w-[320px] rounded-xl border border-lineColor bg-white px-4 text-gray-800 placeholder:text-gray-400 focus:border-buttonColor focus:bg-inputon focus:outline-none"
        />
      </div>
    </EditLayout>
  );
}
