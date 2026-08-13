import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashScreen from "./loginStep/SplashScreen";
import WelcomeScreen from "./loginStep/WelcomeScreen";
import LoginScreen from "./loginStep/LoginScreen";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/welcome" element={<WelcomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
      </Routes>
    </BrowserRouter>
  );
}
