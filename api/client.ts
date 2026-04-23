import axios, { AxiosError } from "axios";

import { env } from "@/lib/config/env";

export interface ApiError {
  message: string;
  statusCode?: number;
  code?: string;
  details?: unknown;
}

export function normalizeApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{
      message?: string;
      code?: string;
      details?: unknown;
    }>;

    return {
      message:
        axiosError.response?.data?.message ??
        axiosError.message ??
        "Something went wrong while communicating with the server.",
      statusCode: axiosError.response?.status,
      code: axiosError.response?.data?.code,
      details: axiosError.response?.data?.details,
    };
  }

  if (error instanceof Error) {
    return { message: error.message };
  }

  return { message: "Unexpected error occurred." };
}

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  // Reserved for auth token injection when authentication is added.
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => Promise.reject(normalizeApiError(error)),
);
