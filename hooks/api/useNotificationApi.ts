import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getNotificationsByTab,
  markAllNotificationsRead,
  markNotificationRead,
  type NotificationQueryTab,
} from "@/api/services/notificationService";

import type { Notification } from "@/types/notification";

export type { Notification };

export const notificationKeys = {
  all: ["notifications"] as const,
  list: (tab: NotificationQueryTab, page: number, limit: number) =>
    ["notifications", tab, page, limit] as const,
};

export function useNotificationsQuery(
  tab: NotificationQueryTab = "all",
  page = 1,
  limit = 20,
) {
  return useQuery<Notification[]>({
    queryKey: notificationKeys.list(tab, page, limit),
    queryFn: () => getNotificationsByTab(tab, page, limit),
  });
}

export function useMarkAllNotificationsReadMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => markAllNotificationsRead(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
  });
}

export function useMarkNotificationReadMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: string) =>
      markNotificationRead(notificationId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
  });
}
