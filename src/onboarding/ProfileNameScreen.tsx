import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileLayout from "../components/ProfileLayout";
import { TextField } from "../components/onboarding";
import profileImg from "../assets/routia-profile.svg";
import { submitOnboardingStep0 } from "../api";
import { tryApi } from "../api/netguard";
import { patchDraft } from "../store/onboardingDraft";

export default function ProfileNameScreen() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleNext = async () => {
    const trimmed = name.trim();
    patchDraft({ name: trimmed });
    // 0단계 저장 (백엔드 미가동 시 데모 모드로 건너뜀)
    await tryApi(() => submitOnboardingStep0(trimmed), null);
    navigate("/onboarding/step1");
  };

  return (
    <ProfileLayout
      title="프로필을 작성해주세요!"
      description={
        <>
          <p className="mt-2 text-sm font-bold text-textColor">
            온보딩 시작 전 프로필을 작성해주세요!
          </p>
          <p className="text-sm text-subtextColor">
            (<span className="text-buttonColor">*</span>항목은 필수 항목입니다)
          </p>
        </>
      }
      onNext={handleNext}
    >
      <img src={profileImg} alt="프로필" className="h-[154px] w-[154px] self-center" />
      <TextField
        label="이름"
        placeholder="어떻게 불러드리면 될까요?"
        value={name}
        onChange={setName}
      />
    </ProfileLayout>
  );
}
