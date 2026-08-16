import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import HomeMenuPage from "./home/HomeMenuPage";
import HomeCalendarPage from "./home/HomeCalendarPage";
import HomeTasksPage from "./home/HomeTasksPage";
import HomeCompletePage from "./home/HomeCompletePage";
import HomeDirectionPage from "./home/HomeDirectionPage";
import ScorePage from "./score/ScorePage";
import ScoreAchievePage from "./score/ScoreAchievePage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black/5">
      <div className="mx-auto w-full max-w-[402px] min-h-screen">
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<AuthScreen />} />
        <Route path="/signup" element={<AuthScreen />} />
        <Route path="/signup/password" element={<SignupScreen />} />
        <Route path="/login/complete" element={<LoginCompleteScreen />} />
        <Route path="/signup/complete" element={<SignupCompleteScreen />} />
        <Route path="/onboarding" element={<OnboardingCompleteScreen />} />
        <Route path="/onboarding/loading" element={<AiPlanLoadingScreen />} />
        <Route path="/onboarding/done" element={<AiPlanDoneScreen />} />
        <Route path="/onboarding/profile" element={<ProfileNameScreen />} />

        <Route path="/onboarding/step1" element={<Step1UserInfo />} />
        <Route path="/onboarding/address" element={<AddressScreen />} />
        <Route path="/onboarding/step2" element={<Step2SkinConcern />} />
        <Route path="/onboarding/step3" element={<Step3Difficulty />} />

        <Route path="/edit/body" element={<ProfileEditBody />} />
        <Route path="/edit/skin" element={<ProfileEditSkin />} />
        <Route path="/edit/routine" element={<ProfileEditRoutine />} />
        <Route path="/edit/notification" element={<ProfileEditAlarm />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/menu" element={<HomeMenuPage />} />
        <Route path="/home/calendar" element={<HomeCalendarPage />} />
        <Route path="/home/tasks" element={<HomeTasksPage />} />
        <Route path="/home/complete" element={<HomeCompletePage />} />
        <Route path="/home/direction" element={<HomeDirectionPage />} />
        <Route path="/score" element={<ScorePage />} />
        <Route path="/score/achieve" element={<ScoreAchievePage />} />
      </Routes>
      </div>
      </div>
    </BrowserRouter>
  );
}