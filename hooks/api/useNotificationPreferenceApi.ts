import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getNotificationPreferences,
  updateNotificationPreferences,
} from "@/api/services";

import type {
  NotificationPreferences,
  UpdateNotificationPreferencesPayload,
} from "@/types";

export const notificationPreferenceKeys = {
  all: ["notificationPreferences"] as const,
};

export function useNotificationPreferencesQuery() {
  return useQuery({
    queryKey: notificationPreferenceKeys.all,
    queryFn: getNotificationPreferences,
  });
}

export function useUpdateNotificationPreferencesMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateNotificationPreferencesPayload) =>
      updateNotificationPreferences(payload),
    onMutate: async (nextPreferences) => {
      const previousPreferences =
        queryClient.getQueryData<NotificationPreferences>(
          notificationPreferenceKeys.all,
        );

      queryClient.setQueryData(
        notificationPreferenceKeys.all,
        nextPreferences,
      );

      await queryClient.cancelQueries({
        queryKey: notificationPreferenceKeys.all,
      });

      return { previousPreferences };
    },
    onError: (_error, _nextPreferences, context) => {
      if (context?.previousPreferences) {
        queryClient.setQueryData(
          notificationPreferenceKeys.all,
          context.previousPreferences,
        );
      }
    },
    onSuccess: (preferences) => {
      queryClient.setQueryData(notificationPreferenceKeys.all, preferences);
    },
  });
}
