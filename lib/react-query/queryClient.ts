import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

import type { ApiError } from "@/api/client";

function shouldRetryQuery(failureCount: number, error: unknown): boolean {
  const apiError = error as ApiError;

  if (
    apiError?.statusCode &&
    apiError.statusCode >= 400 &&
    apiError.statusCode < 500
  ) {
    return false;
  }

  return failureCount < 2;
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  mutationCache: new MutationCache(),
  defaultOptions: {
    queries: {
      retry: shouldRetryQuery,
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: false,
    },
    mutations: {
      retry: 1,
    },
  },
});
