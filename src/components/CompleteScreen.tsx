import { useNavigate } from "react-router-dom";

interface CompleteScreenProps {
  checkSrc: string;      
  title: string;         
  subtitle: string;      
  buttonLabel: string;   
  to: string;            
}

export default function CompleteScreen({
  checkSrc,
  title,
  subtitle,
  buttonLabel,
  to,
}: CompleteScreenProps) {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-rose-100 via-pink-50 to-white px-6">
      <img src={checkSrc} alt="완료" className="h-32 w-32" />

      <h1 className="mt-8 text-2xl font-bold text-neutral-900">{title}</h1>
      <p className="mt-2 text-sm text-neutral-500">{subtitle}</p>

      <button
        type="button"
        onClick={() => navigate(to)}
        className="mt-10 h-[50px] w-[294px] rounded-xl bg-buttonColor px-4 py-3.5 text-sm font-semibold text-white"
      >
        {buttonLabel}
      </button>
    </div>
  );
}