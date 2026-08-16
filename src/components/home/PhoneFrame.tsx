import type { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
}

// 모바일 프레임 - 오버레이(사이드 메뉴/시트/모달)의 기준 컨테이너
export default function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="flex min-h-screen w-full justify-center bg-white">
      <div className="relative min-h-screen w-full max-w-[420px] overflow-hidden bg-white">
        {children}
      </div>
    </div>
  );
}
