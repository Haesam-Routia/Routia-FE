import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashScreen from "./loginStep/SplashScreen";
import WelcomeScreen from "./loginStep/WelcomeScreen";
import LoginScreen from "./loginStep/LoginScreen";
import VerifyScreen from "./signupStep/VerifyScreen";
import SignupScreen from "./signupStep/SignupScreen";
import SignupCompleteScreen from "./signupStep/SignupCompleteScreen";
import LoginCompleteScreen from "./loginStep/LoginCompleteScreen";
import OnboardingCompleteScreen from "./onboarding/OnboardingCompleteScreen";
import AiPlanLoadingScreen from "./onboarding/AiPlanLoadingScreen";
import AiPlanDoneScreen from "./onboarding/AiPlanDoneScreen";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/welcome" element={<WelcomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/login/complete" element={<LoginCompleteScreen />} />
        <Route path="/signup" element={<VerifyScreen />} />
        <Route path="/signup/password" element={<SignupScreen />} />
        <Route path="/signup/complete" element={<SignupCompleteScreen />} />
        <Route path="/onboarding" element={<OnboardingCompleteScreen />} />
        <Route path="/onboarding/loading" element={<AiPlanLoadingScreen />} />
        <Route path="/onboarding/done" element={<AiPlanDoneScreen />} />
      </Routes>
    </BrowserRouter>
  );
}