import type { WeatherInfo } from "../../data/home";
import { SunIcon, UvIcon } from "./WeatherIcons";

interface WeatherCardProps {
  weather: WeatherInfo;
}

export default function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <div className="w-full rounded-xl border border-lineColor bg-white px-4 py-3">
      {/* 위치 */}
      <div className="mb-1 flex items-center gap-1 text-[11px] text-subtextColor">
        <svg
          width="10"
          height="12"
          viewBox="0 0 10 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 0.5C2.79 0.5 1 2.29 1 4.5C1 7.5 5 11.5 5 11.5C5 11.5 9 7.5 9 4.5C9 2.29 7.21 0.5 5 0.5ZM5 6C4.17 6 3.5 5.33 3.5 4.5C3.5 3.67 4.17 3 5 3C5.83 3 6.5 3.67 6.5 4.5C6.5 5.33 5.83 6 5 6Z"
            fill="#7C7C7C"
          />
        </svg>
        <span>{weather.location}</span>
      </div>

      <div className="flex items-stretch">
        {/* 날씨 */}
        <div className="flex flex-1 items-center gap-3">
          <SunIcon />
          <div className="leading-tight">
            <div className="flex items-baseline gap-1">
              {/* 온도 16px / 700 */}
              <span className="text-[16px] font-bold text-buttonColor">{weather.temp}°C</span>
              <span className="text-[12px] font-semibold text-subtextColor">{weather.condition}</span>
            </div>
            {/* 체감 8px / 600 */}
            <div className="mt-0.5 text-[12px] font-semibold text-subtextColor">
              체감 {weather.feelsLike}°C
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <div className="mx-3 w-px self-stretch bg-lineColor" />

        {/* 자외선 */}
        <div className="flex flex-1 items-center gap-3">
          <UvIcon />
          <div className="leading-tight">
            <div className="flex items-baseline gap-1">
              {/* UV 지수 16px / 700 */}
              <span className="text-[16px] font-bold text-buttonColor">{weather.uvIndex}</span>
              <span className="text-[12px] font-semibold text-subtextColor">{weather.uvLevel}</span>
            </div>
            {/* 1행 8px / 500, 2행 7px / 500 */}
            <div className="mt-0.5">
              {weather.uvDesc.split("\n").map((line, i) => (
                <div
                  key={i}
                  className={`font-bold text-subtextColor ${i === 0 ? "text-[10px]" : "text-[10px]"}`}
                >
                  {line}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
