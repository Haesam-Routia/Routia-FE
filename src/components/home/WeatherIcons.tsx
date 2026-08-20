// 홈 날씨 카드용 인라인 아이콘
import littleCloudIcon from "../../assets/routia-little-cloud.svg";
import rainIcon from "../../assets/routia-rain.svg";
import snowIcon from "../../assets/routia-snow.svg";

/**
 * 날씨 상태 텍스트(weatherDescription)에 맞는 아이콘을 렌더링한다.
 * 맑음 → SunIcon(인라인), 구름/흐림 → 구름, 비/소나기 → 비, 눈/진눈깨비 → 눈.
 */
export function WeatherIcon({
  condition,
  className = "h-11 w-11",
}: {
  condition?: string;
  className?: string;
}) {
  const c = condition ?? "";
  if (c.includes("비") || c.includes("소나기")) {
    return <img src={rainIcon} alt="비" className={className} />;
  }
  if (c.includes("눈") || c.includes("진눈깨비")) {
    return <img src={snowIcon} alt="눈" className={className} />;
  }
  if (c.includes("구름") || c.includes("흐")) {
    return <img src={littleCloudIcon} alt="구름" className={className} />;
  }
  return <SunIcon className={className} />;
}

export function SunIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="#FF8A00" strokeWidth="2.5" strokeLinecap="round">
        <line x1="22" y1="3" x2="22" y2="8" />
        <line x1="22" y1="36" x2="22" y2="41" />
        <line x1="3" y1="22" x2="8" y2="22" />
        <line x1="36" y1="22" x2="41" y2="22" />
        <line x1="8.6" y1="8.6" x2="12.1" y2="12.1" />
        <line x1="31.9" y1="31.9" x2="35.4" y2="35.4" />
        <line x1="35.4" y1="8.6" x2="31.9" y2="12.1" />
        <line x1="12.1" y1="31.9" x2="8.6" y2="35.4" />
      </g>
      <circle cx="22" cy="22" r="8.5" fill="#FF8A00" />
    </svg>
  );
}

export function UvIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="#FF8A00" strokeWidth="2.5" strokeLinecap="round">
        <line x1="22" y1="3" x2="22" y2="8" />
        <line x1="6" y1="10" x2="9.5" y2="12.5" />
        <line x1="38" y1="10" x2="34.5" y2="12.5" />
        <line x1="3" y1="22" x2="8" y2="22" />
        <line x1="36" y1="22" x2="41" y2="22" />
      </g>
      <text x="22" y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="#FF8A00">
        UV
      </text>
    </svg>
  );
}
