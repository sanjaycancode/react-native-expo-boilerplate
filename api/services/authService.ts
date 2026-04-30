import { apiClient } from "@/api/client";

import type { ApiAuthResponse, AuthResponse, LoginPayload, LogoutResponse } from "@/types";

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const response = await apiClient.post<ApiAuthResponse>("/auth/login", payload);

  const transformedResponse: AuthResponse = {
    user: {
      id: response.data.data.user.id,
      username: response.data.data.user.username,
      email: response.data.data.user.email,
      firstName: response.data.data.user.first_name,
      lastName: response.data.data.user.last_name,
    },
    accessToken: response.data.data.token,
  };

  return transformedResponse;
}

export async function logout(): Promise<LogoutResponse> {
  const response = await apiClient.post<LogoutResponse>("/auth/logout");
  return response.data;
}
