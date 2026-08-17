import { useEffect, useState } from "react";
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
import {
  AGE_GROUP_BY_LABEL,
  AGE_LABEL_BY_CODE,
  GENDER_BY_LABEL,
  GENDER_VALUE_BY_CODE,
  getCurrentUserId,
  getProfile,
  updateProfile,
  type ProfileUpdateRequest,
} from "../api";
import { tryApi } from "../api/netguard";
import { coordForSido } from "../data/regionCoords";

// "165.5 cm" 같은 표시 문자열에서 숫자만 추출
const num = (s: string): number | undefined => {
  const n = parseFloat(String(s).replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : undefined;
};

export default function ProfileEditBody() {
  const [form, setForm] = useState({
    name: "",
    height: "",
    weight: "",
    age: "",
    gender: "",
    region: { sido: "", sigungu: "" } as RegionValue,
    detail: "",
  });

  const set = (k: "name" | "height" | "weight" | "age" | "gender" | "detail") => (v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  // 진입 시 서버에서 프로필 로드 (로그인/백엔드 없으면 빈 폼 유지)
  useEffect(() => {
    const userId = getCurrentUserId();
    if (userId == null) return;
    void tryApi(() => getProfile(userId), null).then((p) => {
      if (!p) return;
      setForm((prev) => ({
        ...prev,
        name: p.userName ?? prev.name,
        height: p.height != null ? `${p.height} cm` : prev.height,
        weight: p.weight != null ? `${p.weight} kg` : prev.weight,
        age: p.ageGroup ? (AGE_LABEL_BY_CODE[p.ageGroup] ?? prev.age) : prev.age,
        gender: p.gender ? (GENDER_VALUE_BY_CODE[p.gender] ?? prev.gender) : prev.gender,
        region: {
          sido: p.regionSido ?? prev.region.sido,
          sigungu: p.regionSigungu ?? prev.region.sigungu,
        },
      }));
    });
  }, []);

  // 저장: 값이 있는 필드만 담아 PATCH (userName 은 profile PATCH 대상 아님)
  const handleSave = async () => {
    const userId = getCurrentUserId();
    if (userId == null) return;
    const body: ProfileUpdateRequest = {};
    const h = num(form.height);
    const w = num(form.weight);
    if (h !== undefined) body.height = h;
    if (w !== undefined) body.weight = w;
    if (form.age && AGE_GROUP_BY_LABEL[form.age]) body.ageGroup = AGE_GROUP_BY_LABEL[form.age];
    if (form.gender && GENDER_BY_LABEL[form.gender]) body.gender = GENDER_BY_LABEL[form.gender];
    if (form.region.sido) {
      body.regionSido = form.region.sido;
      body.regionSigungu = form.region.sigungu;
      const { lat, lng } = coordForSido(form.region.sido);
      body.latitude = lat;
      body.longitude = lng;
      body.locationSource = "MANUAL";
    }
    await tryApi(() => updateProfile(userId, body), null);
  };

  return (
    <EditLayout active="body" onSave={handleSave}>
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

      <div className="flex w-full flex-col gap-3">
        <RegionSelect
          value={form.region}
          onChange={(region) => setForm((p) => ({ ...p, region }))}
        />
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
