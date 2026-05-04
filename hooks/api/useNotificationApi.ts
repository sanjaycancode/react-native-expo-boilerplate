import { useQuery } from "@tanstack/react-query";

import { getNotifications } from "@/api/services/notificationService";

import type { Notification } from "@/types/notification";

export type { Notification };

export const notificationKeys = {
  all: ["notifications"] as const,
};

export function useNotificationsQuery(page = 1, limit = 20) {
  return useQuery<Notification[]>({
    queryKey: [notificationKeys.all, page, limit],
    queryFn: () => getNotifications(page, limit),
  });
}
