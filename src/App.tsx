import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashScreen from "./loginStep/SplashScreen";
import SignupScreen from "./signupStep/SignupScreen";
import SignupCompleteScreen from "./signupStep/SignupCompleteScreen";
import LoginCompleteScreen from "./loginStep/LoginCompleteScreen";
import OnboardingCompleteScreen from "./onboarding/OnboardingCompleteScreen";
import AiPlanLoadingScreen from "./onboarding/AiPlanLoadingScreen";
import AiPlanDoneScreen from "./onboarding/AiPlanDoneScreen";
import AuthScreen from "./Authscreen/Authscreen";

export default function App() {
  return (
    <BrowserRouter>
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
      </Routes>
    </BrowserRouter>
  );
}
