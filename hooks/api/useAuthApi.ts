import { useMutation } from "@tanstack/react-query";

import { login, logout } from "@/api";

import type { LoginPayload } from "@/types";

export function useLoginMutation() {
  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
  });
}

export function useLogoutMutation() {
  return useMutation({
    mutationFn: logout,
  });
}
