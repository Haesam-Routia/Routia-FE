import CompleteScreen from "../components/CompleteScreen";
import checkImg from "../assets/routia-check.svg";

export default function LoginCompleteScreen() {
  return (
    <CompleteScreen
      checkSrc={checkImg}
      title="로그인 완료!"
      subtitle="이제 나만의 루틴을 만들어볼까요?"
      buttonLabel="온보딩 하러가기"
      to="/onboarding"
    />
  );
}
