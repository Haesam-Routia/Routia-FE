import checkPink from "../../assets/routia-check-pink.svg";
import BlurScrim from "./BlurScrim";

interface CompleteModalProps {
  onClose?: () => void;
  onConfirm?: () => void;
}

// 오늘 할 일 달성 완료 모달
export default function CompleteModal({ onClose, onConfirm }: CompleteModalProps) {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center px-8">
      <BlurScrim onClose={onClose} />

      <div className="relative flex h-[284px] w-[282px] flex-col items-center rounded-2xl bg-white pb-5 pt-[78px] shadow-[0_6px_24px_0_rgba(180,180,180,0.5)]">
        <img src={checkPink} alt="완료" className="h-[68px] w-[68px]" />
        <p className="mt-[20px] text-center text-base font-bold text-textColor">
          오늘의 할 일이 완료되었습니다!
        </p>
        <button
          type="button"
          onClick={onConfirm}
          className="mt-[29px] flex h-[50px] w-[202px] items-center justify-center rounded-xl bg-buttonColor px-4 py-3.5 text-sm font-semibold text-white"
        >
          회원가입으로 돌아가기
        </button>
      </div>
    </div>
  );
}
