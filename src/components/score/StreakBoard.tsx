import sparkle from "../../assets/routia-score.svg";
import dot from "../../assets/routia-circle.svg";
import bigDot from "../../assets/routia-bigcircle.svg";
import bigStar from "../../assets/routia-Star.svg";
import successCircle from "../../assets/routia-success-circle.svg";

interface StreakBoardProps {
  current: number;
  successCount?: number; 
}


const ROW1 = [30, 76, 122, 168, 214, 260]; 
const ROW2 = [290, 246, 202, 158, 114, 70]; 
const ROW3 = [70, 114, 158, 202, 246, 290]; 

export default function StreakBoard({ current, successCount = 1 }: StreakBoardProps) {
  return (
    <svg viewBox="0 0 340 210" className="w-full" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M30,30 L260,30 C288,30 302,44 302,62 C302,84 300,120 290,120 L70,120 C44,120 28,132 28,152 C28,172 44,184 70,184 L308,184"
        fill="none"
        stroke="#C9C9C9"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M311,178 L319,184 L311,190"
        fill="none"
        stroke="#C9C9C9"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {ROW2.map((x, i) =>
        i < successCount ? (
          <image key={`s2${i}`} href={successCircle} x={x - 10.5} y={120 - 10.5} width="21" height="21" />
        ) : (
          <image key={`d2${i}`} href={dot} x={x - 8.5} y={120 - 8.5} width="17" height="17" />
        )
      )}
      {ROW3.map((x, i) => (
        <image key={`d3${i}`} href={dot} x={x - 8.5} y={184 - 8.5} width="17" height="17" />
      ))}

      <image href={bigDot} x={28 - 15.5} y={152 - 15.5} width="31" height="31" />

      {ROW1.map((x, i) => (
        <image key={`s${i}`} href={sparkle} x={x - 15} y={30 - 15} width="30" height="30" />
      ))}

      <image href={bigStar} x={300 - 26.5} y={62 - 25.5} width="53" height="51" />
      <text
        x="300"
        y="64"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="20"
        fontWeight="700"
        fill="#FFFFFF"
      >
        {current}
      </text>
    </svg>
  );
}
