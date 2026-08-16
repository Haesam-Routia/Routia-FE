import { REGIONS, SIDO_LIST } from "../../data/regions";

export interface RegionValue {
  sido: string;
  sigungu: string;
}

interface RegionSelectProps {
  label?: string;
  required?: boolean;
  value: RegionValue;
  onChange: (v: RegionValue) => void;
}

const selectClass =
  "h-[50px] flex-1 rounded-ob-md border-[1.5px] border-ob-border bg-ob-bg px-4 text-[13.5px] font-semibold text-ob-ink focus:border-ob-primary focus:bg-ob-surface focus:outline-none transition-colors appearance-none";

export default function RegionSelect({
  label = "거주 지역",
  required = true,
  value,
  onChange,
}: RegionSelectProps) {
  const sigunguList = REGIONS[value.sido] ?? [];

  return (
    <div>
      <label className="text-[15.5px] font-extrabold text-ob-ink flex items-center gap-[5px]">
        {label}
        {required && <span className="text-ob-primary font-extrabold">*</span>}
      </label>

      <div className="mt-3 flex gap-2">
        {/* 시도 선택 */}
        <select
          className={selectClass}
          value={value.sido}
          onChange={(e) => onChange({ sido: e.target.value, sigungu: "" })}
        >
          <option value="" disabled>시/도</option>
          {SIDO_LIST.map((sido) => (
            <option key={sido} value={sido}>{sido}</option>
          ))}
        </select>

        {/* 시군구 선택 (시도 선택 전엔 비활성) */}
        <select
          className={selectClass}
          value={value.sigungu}
          onChange={(e) => onChange({ ...value, sigungu: e.target.value })}
          disabled={!value.sido}
        >
          <option value="" disabled>시/군/구</option>
          {sigunguList.map((sgg) => (
            <option key={sgg} value={sgg}>{sgg}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
