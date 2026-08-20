import checkPink from "../assets/routia-check-pink.svg";

interface SaveSuccessModalProps {
  open: boolean;
  onClose: () => void;
  message?: string;
}

export default function SaveSuccessModal({
  open,
  onClose,
  message = "저장되었습니다!",
}: SaveSuccessModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <div className="flex w-[280px] flex-col items-center rounded-2xl bg-white px-6 py-8 shadow-xl">
        <img src={checkPink} alt="완료" className="h-16 w-16" />
        <p className="mt-4 text-sm text-textColor">{message}</p>
        <button
          type="button"
          onClick={onClose}
          className="mt-5 h-[40px] w-full rounded-xl bg-buttonColor text-sm font-semibold text-white transition-all duration-200 active:scale-[0.98] active:bg-buttonPressedColor"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
