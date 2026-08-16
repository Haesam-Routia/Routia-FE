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
  "h-[50px] flex-1 rounded-xl border border-lineColor bg-white px-4 text-sm text-gray-800 focus:border-buttonColor focus:outline-none";

export default function RegionSelect({
  label = "거주 지역",
  required = true,
  value,
  onChange,
}: RegionSelectProps) {
  const sigunguList = REGIONS[value.sido] ?? [];

  return (
    <div>
      <label className="text-sm font-semibold text-textColor">
        {label}
        {required && <span className="text-buttonColor">*</span>}
      </label>

      <div className="mt-2 flex gap-2">
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
