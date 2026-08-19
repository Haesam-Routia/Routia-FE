import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { getAccessToken } from "./api";
import SplashScreen from "./loginStep/SplashScreen";
import SignupScreen from "./signupStep/SignupScreen";
import SignupCompleteScreen from "./signupStep/SignupCompleteScreen";
import LoginCompleteScreen from "./loginStep/LoginCompleteScreen";
import OnboardingCompleteScreen from "./onboarding/OnboardingCompleteScreen";
import AiPlanLoadingScreen from "./onboarding/AiPlanLoadingScreen";
import AiPlanDoneScreen from "./onboarding/AiPlanDoneScreen";
import AuthScreen from "./Authscreen/Authscreen";
import ProfileNameScreen from "./onboarding/ProfileNameScreen";
import Step1UserInfo from "./onboarding/Step1UserInfo";
import AddressScreen from "./onboarding/AddressScreen";
import Step2SkinConcern from "./onboarding/Step2SkinConcern";
import Step3Difficulty from "./onboarding/Step3Difficulty";
import ProfileEditBody from "./edit/ProfileEditBody";
import ProfileEditSkin from "./edit/ProfileEditSkin";
import ProfileEditRoutine from "./edit/ProfileEditRoutine";
import ProfileEditAlarm from "./edit/ProfileEditAlarm";
import HomePage from "./home/HomePage";
import ScorePage from "./score/ScorePage";
import ScoreAchievePage from "./score/ScoreAchievePage";

/** 토큰 없으면 로그인 화면으로 리다이렉트 */
function AuthGuard({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const token = getAccessToken();
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black/5">
        <div className="mx-auto w-full max-w-[402px] min-h-screen">
          <Routes>
            {/* 비인증 라우트 */}
            <Route path="/" element={<SplashScreen />} />
            <Route path="/login" element={<AuthScreen />} />
            <Route path="/signup" element={<AuthScreen />} />
            <Route path="/signup/password" element={<SignupScreen />} />
            <Route path="/login/complete" element={<LoginCompleteScreen />} />
            <Route path="/signup/complete" element={<SignupCompleteScreen />} />

            {/* 인증 필요 라우트 */}
            <Route path="/onboarding" element={<AuthGuard><OnboardingCompleteScreen /></AuthGuard>} />
            <Route path="/onboarding/loading" element={<AuthGuard><AiPlanLoadingScreen /></AuthGuard>} />
            <Route path="/onboarding/done" element={<AuthGuard><AiPlanDoneScreen /></AuthGuard>} />
            <Route path="/onboarding/profile" element={<AuthGuard><ProfileNameScreen /></AuthGuard>} />
            <Route path="/onboarding/step1" element={<AuthGuard><Step1UserInfo /></AuthGuard>} />
            <Route path="/onboarding/address" element={<AuthGuard><AddressScreen /></AuthGuard>} />
            <Route path="/onboarding/step2" element={<AuthGuard><Step2SkinConcern /></AuthGuard>} />
            <Route path="/onboarding/step3" element={<AuthGuard><Step3Difficulty /></AuthGuard>} />
            <Route path="/edit/body" element={<AuthGuard><ProfileEditBody /></AuthGuard>} />
            <Route path="/edit/skin" element={<AuthGuard><ProfileEditSkin /></AuthGuard>} />
            <Route path="/edit/routine" element={<AuthGuard><ProfileEditRoutine /></AuthGuard>} />
            <Route path="/edit/notification" element={<AuthGuard><ProfileEditAlarm /></AuthGuard>} />
            <Route path="/home" element={<AuthGuard><HomePage /></AuthGuard>} />
            <Route path="/score" element={<AuthGuard><ScorePage /></AuthGuard>} />
            <Route path="/score/achieve" element={<AuthGuard><ScoreAchievePage /></AuthGuard>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
