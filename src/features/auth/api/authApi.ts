import { apiClient } from "@/services/apiClient";
import { clearAuthTokens, setAuthTokens } from "@/services/authTokenStorage";

import type {
  LoginFormValues,
  LoginRequest,
  MemberInfoResponse,
  SignupFormValues,
  SignupRequest,
  TokenResponse,
} from "@/features/auth/types";

export async function login(values: LoginFormValues): Promise<void> {
  const requestBody: LoginRequest = {
    loginId: values.username,
    password: values.password,
  };
  const tokens = await apiClient<TokenResponse>("/api/auth/login", {
    method: "POST",
    body: requestBody,
    auth: false,
  });

  setAuthTokens(tokens);
}

export async function signup(values: SignupFormValues): Promise<void> {
  const requestBody: SignupRequest = {
    loginId: values.username,
    password: values.password,
    nickname: values.nickname,
  };

  await apiClient<void>("/api/auth/signup", {
    method: "POST",
    body: requestBody,
    auth: false,
  });
}

export async function getMyInfo(): Promise<MemberInfoResponse> {
  return apiClient<MemberInfoResponse>("/api/auth/me");
}

export async function withdraw(): Promise<void> {
  await apiClient<void>("/api/auth/withdraw", {
    method: "DELETE",
  });
  clearAuthTokens();
}
