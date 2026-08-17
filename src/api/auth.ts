// 인증 관련 엔드포인트 (/api/v1/auth/*)
import { requestRaw, setAccessToken } from "./http";
import type { EmailCheckResponse, LoginRequest, LoginResponse, SignupRequest } from "./types";

/** 이메일 중복 확인. GET /email/check-duplicate?email= */
export function checkEmailDuplicate(email: string): Promise<EmailCheckResponse> {
  return requestRaw<EmailCheckResponse>("/api/v1/auth/email/check-duplicate", {
    method: "GET",
    query: { email },
    auth: false,
  });
}

/** 이메일 인증번호 발송. */
export function sendEmailVerificationCode(email: string): Promise<void> {
  return requestRaw<void>("/api/v1/auth/email/verification-code", {
    method: "POST",
    body: { email },
    auth: false,
  });
}

/** 이메일 인증번호 확인. */
export function verifyEmailCode(email: string, code: string): Promise<void> {
  return requestRaw<void>("/api/v1/auth/email/verify", {
    method: "POST",
    body: { email, code },
    auth: false,
  });
}

/** 회원가입. 성공 시 201, 바디 없음. */
export function signup(req: SignupRequest): Promise<void> {
  return requestRaw<void>("/api/v1/auth/signup", { method: "POST", body: req, auth: false });
}

/** 로그인. 성공 시 accessToken 을 저장하고 응답을 반환. */
export async function login(req: LoginRequest): Promise<LoginResponse> {
  const res = await requestRaw<LoginResponse>("/api/v1/auth/login", {
    method: "POST",
    body: req,
    auth: false,
  });
  setAccessToken(res.accessToken);
  return res;
}
