import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegionSelect, type RegionValue } from "../components/onboarding";
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

  const ages = ["10대", "20대", "30대", "40대", "50대"];

  return (
    <div className="relative flex w-full flex-col bg-white min-h-screen">
      {/* 상단 네비 */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-2 shrink-0">
        <button
          type="button"
          onClick={() => navigate(-1 as never)}
          className="w-8 h-8 flex items-center justify-center"
        >
          <svg className="w-5 h-5 text-textColor" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="flex-1 h-1 rounded-full bg-neutral-100 overflow-hidden">
          <div className="h-full w-1/4 rounded-full bg-buttonColor transition-all duration-500" />
        </div>
        <span className="text-xs font-medium text-subtextColor">1/4</span>
      </div>

      {/* 타이틀 */}
      <div className="px-6 pt-4 pb-2">
        <h1 className="text-[22px] font-bold text-textColor leading-snug">
          사용자 정보를 입력해주세요
        </h1>
        <p className="mt-1.5 text-[13px] text-subtextColor">
          맞춤 루틴 추천을 위한 기본 정보예요
        </p>
      </div>

      {/* 콘텐츠 */}
      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-[100px]">
        <div className="flex flex-col gap-7">
          {/* 키 + 몸무게 */}
          <div>
            <p className="text-[13px] font-semibold text-textColor mb-2.5">
              신체 정보 <span className="text-buttonColor">*</span>
            </p>
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  inputMode="decimal"
                  value={form.height}
                  onChange={(e) => set("height")(e.target.value)}
                  placeholder="키"
                  className="h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-textColor placeholder:text-neutral-400 focus:border-buttonColor focus:outline-none transition-colors"
                />
                <span className="mt-1 block text-[11px] text-subtextColor pl-1">cm</span>
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  inputMode="decimal"
                  value={form.weight}
                  onChange={(e) => set("weight")(e.target.value)}
                  placeholder="몸무게"
                  className="h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-textColor placeholder:text-neutral-400 focus:border-buttonColor focus:outline-none transition-colors"
                />
                <span className="mt-1 block text-[11px] text-subtextColor pl-1">kg</span>
              </div>
            </div>
          </div>

          {/* 나이대 */}
          <div>
            <p className="text-[13px] font-semibold text-textColor mb-2.5">
              나이대 <span className="text-buttonColor">*</span>
            </p>
            <div className="flex gap-2">
              {ages.map((age) => (
                <button
                  key={age}
                  type="button"
                  onClick={() => set("age")(age)}
                  className={`h-10 flex-1 rounded-xl text-[13px] font-semibold transition-all ${
                    form.age === age
                      ? "bg-buttonColor text-white shadow-sm"
                      : "bg-neutral-50 text-subtextColor border border-neutral-200 active:scale-95"
                  }`}
                >
                  {age}
                </button>
              ))}
            </div>
          </div>

          {/* 성별 */}
          <div>
            <p className="text-[13px] font-semibold text-textColor mb-2.5">성별</p>
            <div className="flex gap-3">
              {[
                { value: "female", label: "여성", icon: femaleIcon },
                { value: "male", label: "남성", icon: maleIcon },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => set("gender")(opt.value)}
                  className={`flex h-[60px] flex-1 items-center justify-center gap-2.5 rounded-xl border transition-all active:scale-95 ${
                    form.gender === opt.value
                      ? "border-buttonColor bg-[#FFF1F3] shadow-sm"
                      : "border-neutral-200 bg-white"
                  }`}
                >
                  <img src={opt.icon} alt={opt.label} className="h-7 w-7" />
                  <span
                    className={`text-sm font-semibold ${
                      form.gender === opt.value ? "text-buttonColor" : "text-textColor"
                    }`}
                  >
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 거주 지역 */}
          <div>
            <p className="text-[13px] font-semibold text-textColor mb-2.5">
              거주 지역 <span className="text-buttonColor">*</span>
            </p>
            <RegionSelect
              label=""
              value={form.region}
              onChange={(region) => setForm((prev) => ({ ...prev, region }))}
            />
            <input
              type="text"
              value={form.detail}
              onChange={(e) => set("detail")(e.target.value)}
              placeholder="상세 주소 (선택)"
              className="mt-2.5 h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-textColor placeholder:text-neutral-400 focus:border-buttonColor focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* 하단 버튼 (스플래시/로그인과 동일 스타일) */}
      <div className="absolute left-0 right-0 bottom-0 px-6 pb-8 pt-4 bg-gradient-to-t from-white via-white to-transparent">
        <button
          type="button"
          onClick={() => navigate("/onboarding/step2")}
          className="w-full h-14 bg-buttonColor rounded-xl flex justify-center items-center cursor-pointer hover:opacity-90 active:scale-[0.98] transition-all"
        >
          <span className="text-white text-base font-semibold">다음으로</span>
        </button>
      </div>
    </div>
  );
}
