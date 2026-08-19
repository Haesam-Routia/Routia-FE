import sparkle from "../../assets/routia-score.svg";
import dot from "../../assets/routia-circle.svg";

interface StreakBoardProps {
  current: number;
}

// 3행으로 이어지는 경로 위의 포인트들 (총 21개, 한 줄 7개)
// 각 행의 y 좌표: 40, 110, 180 (간격 70 균등)
const ROW1 = [50, 92, 134, 176, 218, 260, 302];
const ROW2 = [302, 260, 218, 176, 134, 92, 50];
const ROW3 = [50, 92, 134, 176, 218, 260, 302];

const Y1 = 40;
const Y2 = 110;
const Y3 = 180;

export default function StreakBoard({ current }: StreakBoardProps) {
  // 달성 일수 (최대 18개 포인트)
  const totalPoints = ROW1.length + ROW2.length + ROW3.length;
  const starCount = Math.min(Math.max(current, 0), totalPoints);

  return (
    <svg viewBox="0 0 340 210" className="w-full" xmlns="http://www.w3.org/2000/svg">
      {/* 경로 */}
      <path
        d={`M50,${Y1} L302,${Y1} Q330,${Y1} 330,${(Y1 + Y2) / 2} Q330,${Y2} 302,${Y2} L50,${Y2} Q22,${Y2} 22,${(Y2 + Y3) / 2} Q22,${Y3} 50,${Y3} L320,${Y3}`}
        fill="none"
        stroke="#C9C9C9"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={`M323,${Y3 - 5} L330,${Y3} L323,${Y3 + 5}`}
        fill="none"
        stroke="#C9C9C9"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* ROW1: 인덱스 0~6 */}
      {ROW1.map((x, i) => {
        const idx = i;
        return idx < starCount ? (
          <image key={`r1${i}`} href={sparkle} x={x - 12} y={Y1 - 12} width="24" height="24" />
        ) : (
          <image key={`r1${i}`} href={dot} x={x - 7} y={Y1 - 7} width="14" height="14" />
        );
      })}

      {/* ROW2: 인덱스 7~13 */}
      {ROW2.map((x, i) => {
        const idx = ROW1.length + i;
        return idx < starCount ? (
          <image key={`r2${i}`} href={sparkle} x={x - 12} y={Y2 - 12} width="24" height="24" />
        ) : (
          <image key={`r2${i}`} href={dot} x={x - 7} y={Y2 - 7} width="14" height="14" />
        );
      })}

      {/* ROW3: 인덱스 14~20 */}
      {ROW3.map((x, i) => {
        const idx = ROW1.length + ROW2.length + i;
        return idx < starCount ? (
          <image key={`r3${i}`} href={sparkle} x={x - 12} y={Y3 - 12} width="24" height="24" />
        ) : (
          <image key={`r3${i}`} href={dot} x={x - 7} y={Y3 - 7} width="14" height="14" />
        );
      })}
    </svg>
  );
}
