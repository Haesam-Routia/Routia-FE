import type { ReactNode } from "react";
import loadingBar from "../assets/routia-loadingbar.svg";
import { NextButton } from "./onboarding";

interface StepLayoutProps {
  title: ReactNode;          
  description?: ReactNode;   
  showBar?: boolean;     
  children: ReactNode;      
  buttonText?: string;       
  onNext?: () => void;      
}

export default function StepLayout({
  title,
  description,
  showBar = true,
  children,
  buttonText = "다음으로",
  onNext,
}: StepLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col px-6 pb-6 w-full">
      {showBar && <img src={loadingBar} alt="진행 상태" className="mt-2 h-[7px] w-[362px] self-center" />}

      <h1 className="mt-[17px] text-2xl font-bold text-textColor">{title}</h1>
      {description && (
        <div className="mt-[11px] text-sm leading-relaxed text-textColor">{description}</div>
      )}

      <div className="mt-[40px] flex flex-1 flex-col">{children}</div>

      <NextButton onClick={onNext}>{buttonText}</NextButton>
    </div>
  );
}