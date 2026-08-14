import { useState } from "react";
import { useLocation } from "react-router-dom";
import LogoText from "../assets/routia-text-img.svg";
import AuthTabSwitcher from "../components/Authtabswitcher";
import SignupForm from "./Signupform";
import LoginForm from "./Loginfrom";

type Tab = "login" | "signup";

/**
 * 로고 이미지 + AuthTabSwitcher는 그대로 두고,
 * 탭 선택값(activeTab)에 따라 아래 폼 부분만 SignupForm ↔ LoginForm으로 교체합니다.
 * /login, /signup 두 경로가 이 화면 하나를 같이 쓰므로,
 * 진입 경로에 따라 초기 탭만 다르게 잡아줍니다.
 */
export default function AuthScreen() {
  const location = useLocation();
  const initialTab: Tab = location.pathname === "/login" ? "login" : "signup";
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);

  return (
    <div className="flex min-h-screen w-full justify-center bg-white px-6 pb-12 pt-[86px]">
      <div className="flex h-fit w-full flex-col rounded-xl bg-white px-2 py-[17px]">
        <img src={LogoText} alt="로고" className="h-15 mb-10" />

        <AuthTabSwitcher defaultTab={activeTab} onChange={setActiveTab} />

        {activeTab === "signup" ? <SignupForm /> : <LoginForm />}
      </div>
    </div>
  );
}
