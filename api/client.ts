import axios, { AxiosError } from "axios";

import { emitUnauthorized } from "@/api/authEvents";

import { getAsyncStorageItem } from "@/utils/asyncStorage";

import { env } from "@/lib/config/env";

export const ACCESS_TOKEN_KEY = "accessToken";

export interface ApiError {
  message: string;
  statusCode?: number;
  code?: string;
  details?: unknown;
}

function extractMessageFromPayload(payload: unknown): string | undefined {
  if (typeof payload === "string" && payload.trim().length > 0) {
    return payload;
  }

  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }

  if ("message" in payload && typeof payload.message === "string") {
    return payload.message;
  }

  if ("error" in payload && typeof payload.error === "string") {
    return payload.error;
  }

  if ("errors" in payload && typeof payload.errors === "object") {
    const errorValues = Object.values(
      payload.errors as Record<string, unknown>,
    );

    for (const value of errorValues) {
      if (typeof value === "string" && value.trim().length > 0) {
        return value;
      }

      if (Array.isArray(value)) {
        const firstString = value.find(
          (item): item is string =>
            typeof item === "string" && item.trim().length > 0,
        );

        if (firstString) {
          return firstString;
        }
      }
    }
  }

  return undefined;
}

export function normalizeApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{
      message?: string;
      error?: string;
      code?: string;
      details?: unknown;
      errors?: Record<string, string | string[]>;
    }>;
    const responseData = axiosError.response?.data;
    const extractedMessage = extractMessageFromPayload(responseData);
    const statusCode = axiosError.response?.status;

    const message =
      extractedMessage ??
      (statusCode === 401
        ? "Invalid email or password."
        : (axiosError.message ??
          "Something went wrong while communicating with the server."));

    return {
      message,
      statusCode,
      code: responseData?.code,
      details: responseData?.details,
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

apiClient.interceptors.request.use(async (config) => {
  const token = await getAsyncStorageItem<string>(ACCESS_TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      emitUnauthorized();
    }

    return Promise.reject(normalizeApiError(error));
  },
);
