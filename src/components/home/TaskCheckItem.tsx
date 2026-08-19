import checkPink from "../../assets/routia-check-pink.svg";

interface TaskCheckItemProps {
  label: string;
  done: boolean;
  onToggle?: () => void;
}

// 오늘 할 일 체크 항목 (완료 시 핑크 체크, 미완료 시 핑크 테두리 원)
export default function TaskCheckItem({ label, done, onToggle }: TaskCheckItemProps) {
  return (
    <li
      className="flex items-center gap-2.5 cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        onToggle?.();
      }}
    >
      {done ? (
        <img src={checkPink} alt="완료" className="h-[18px] w-[18px] shrink-0" />
      ) : (
        <span className="h-[18px] w-[18px] shrink-0 rounded-full border-2 border-buttonColor" />
      )}
      <span
        className={
          done
            ? "text-[13px] font-semibold text-subtextColor line-through"
            : "text-sm font-semibold text-textColor"
        }
      >
        {label}
      </span>
    </li>
  );
}
