// 프로필 / 니즈 엔드포인트 (/api/v1/users/{id}/*)
import { requestData } from "./http";
import type {
  NeedsResponse,
  NeedsUpdateRequest,
  ProfileResponse,
  ProfileUpdateRequest,
} from "./types";

export function getProfile(userId: number): Promise<ProfileResponse> {
  return requestData<ProfileResponse>(`/api/v1/users/${userId}/profile`, { method: "GET" });
}

export function updateProfile(
  userId: number,
  req: ProfileUpdateRequest,
): Promise<ProfileResponse> {
  return requestData<ProfileResponse>(`/api/v1/users/${userId}/profile`, {
    method: "PATCH",
    body: req,
  });
}

export function getNeeds(userId: number): Promise<NeedsResponse> {
  return requestData<NeedsResponse>(`/api/v1/users/${userId}/needs`, { method: "GET" });
}

export function updateNeeds(userId: number, req: NeedsUpdateRequest): Promise<NeedsResponse> {
  return requestData<NeedsResponse>(`/api/v1/users/${userId}/needs`, {
    method: "PATCH",
    body: req,
  });
}
