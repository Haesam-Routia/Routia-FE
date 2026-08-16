import checkPink from "../../assets/routia-check-pink.svg";

interface AchieveModalProps {
  onClose?: () => void;
}


export default function AchieveModal({ onClose }: AchieveModalProps) {
  return (
    <div className="mt-[78px] fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <div className=" flex h-[284px] w-[282px] flex-col items-center rounded-2xl bg-white pb-5 pt-[78px] shadow-[0_6px_24px_0_rgba(180,180,180,0.5)]">
        <img src={checkPink} alt="완료" className="h-16 w-16" />
        <p className="mt-[20px] text-base font-bold text-textColor">달성되었습니다!</p>
        <button
          type="button"
          onClick={onClose}
          className="mt-[29px] flex h-[50px] w-[202px] items-center justify-center rounded-xl bg-buttonColor px-4 py-3.5 text-sm font-semibold text-white"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
