import CompleteScreen from "../components/CompleteScreen";
import checkImg from "../assets/routia-check.svg";

export default function SignupCompleteScreen() {
  return (
    <CompleteScreen
      checkSrc={checkImg}
      title="회원가입 완료!"
      subtitle="AI 맞춤형 안티에이징 루틴을 시작할 준비가 되었어요"
      buttonLabel="로그인 하러가기"
      to="/login"
    />
  );
}
