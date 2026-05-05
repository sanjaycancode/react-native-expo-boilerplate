import { apiClient } from "@/api/client";

import type {
  ApiNotification,
  Notification,
  NotificationTab,
} from "@/types/notification";

type ApiNotificationsResponse =
  | ApiNotification[]
  | {
      success?: boolean;
      data?:
        | ApiNotification[]
        | {
            notifications?: ApiNotification[];
            pagination?: unknown;
            unreadCount?: unknown;
          };
      notifications?: ApiNotification[];
    };

const NOTIFICATIONS_ENDPOINT = "/notifications";
const NOTIFICATIONS_READ_ALL_ENDPOINT = "/notifications/read-all";
const NOTIFICATIONS_READ_ENDPOINT = (id: string) => `/notifications/${id}/read`;

function isWrappedNotificationsResponse(
  payload: ApiNotificationsResponse,
): payload is {
  success?: boolean;
  data?:
    | ApiNotification[]
    | {
        notifications?: ApiNotification[];
        pagination?: unknown;
        unreadCount?: unknown;
      };
  notifications?: ApiNotification[];
} {
  return typeof payload === "object" && payload !== null;
}

function resolveNotificationKind(
  notification: ApiNotification,
): Notification["kind"] {
  return (
    notification.kind ??
    notification.type ??
    notification.notification_type ??
    "new_class_available"
  );
}

function resolveNotificationTab(
  kind: Notification["kind"],
): Notification["tab"] {
  switch (kind) {
    case "class_enrollment":
      return "result";
    case "class_reminder":
    case "booking_reminder":
      return "booking";
    case "new_class_available":
    default:
      return "unread";
  }
}

function resolveNotificationUnread(
  notification: ApiNotification,
  tab: Notification["tab"],
) {
  if (notification.read_at || notification.clicked_at) {
    return false;
  }

  if (typeof notification.unread === "boolean") {
    return notification.unread;
  }

  if (typeof notification.read === "boolean") {
    return !notification.read;
  }

  if (typeof notification.is_read === "boolean") {
    return !notification.is_read;
  }

  return tab === "unread";
}

function resolveNotificationTimeAgo(notification: ApiNotification) {
  return (
    notification.timeAgo ??
    notification.relative_time ??
    notification.created_at ??
    notification.createdAt ??
    "Just now"
  );
}

function resolveNotificationTitle(notification: ApiNotification) {
  return (
    notification.title ??
    notification.payload?.class_title ??
    notification.payload?.message ??
    "Notification"
  );
}

function resolveNotificationDescription(notification: ApiNotification) {
  return (
    notification.description ??
    notification.message ??
    notification.payload?.message ??
    ""
  );
}

function resolveNotificationList(
  payload: ApiNotificationsResponse,
): ApiNotification[] {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!isWrappedNotificationsResponse(payload)) {
    return [];
  }

  if (Array.isArray(payload.data)) {
    return payload.data;
  }

  if (payload.data && typeof payload.data === "object") {
    const nestedData = payload.data as {
      notifications?: ApiNotification[];
    };

    if (Array.isArray(nestedData.notifications)) {
      return nestedData.notifications;
    }
  }

  if (Array.isArray(payload.notifications)) {
    return payload.notifications;
  }

  return [];
}

function normalizeNotificationsResponse(
  payload: ApiNotificationsResponse,
): Notification[] {
  const notifications = resolveNotificationList(payload);

  return notifications.map((notification) => {
    const kind = resolveNotificationKind(notification);
    const tab = resolveNotificationTab(kind);

    return {
      id: String(notification.id),
      title: resolveNotificationTitle(notification),
      description: resolveNotificationDescription(notification),
      timeAgo: resolveNotificationTimeAgo(notification),
      kind,
      tab,
      unread: resolveNotificationUnread(notification, tab),
    };
  });
}

export type NotificationQueryTab = "all" | NotificationTab;

export async function getNotificationsByTab(
  tab: NotificationQueryTab,
  page = 1,
  limit = 20,
) {
  const params: Record<string, string | number> = {
    page,
    limit,
  };

  if (tab === "unread") {
    params.status = "unread";
  }

  if (tab === "booking") {
    params.type = "booking";
  }

  if (tab === "result") {
    params.type = "result";
  }

  const response = await apiClient.get<ApiNotificationsResponse>(
    NOTIFICATIONS_ENDPOINT,
    {
      params,
    },
  );

  if (typeof response.data === "string") {
    throw new Error(
      "Unexpected HTML response from notifications API. Check API base URL and route.",
    );
  }

  return normalizeNotificationsResponse(response.data);
}

export async function markAllNotificationsRead(): Promise<void> {
  await apiClient.post(NOTIFICATIONS_READ_ALL_ENDPOINT);
}

export async function markNotificationRead(
  notificationId: string,
): Promise<void> {
  await apiClient.post(NOTIFICATIONS_READ_ENDPOINT(notificationId));
}
