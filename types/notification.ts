export type NotificationKind =
  | "new_class_available"
  | "class_enrollment"
  | "class_reminder"
  | "booking_reminder";

export type NotificationTab = "unread" | "booking" | "result";

export interface Notification {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  kind: NotificationKind;
  tab: NotificationTab;
  unread?: boolean;
}

export interface ApiNotification {
  id: string | number;
  title?: string;
  description?: string;
  message?: string;
  kind?: NotificationKind;
  type?: NotificationKind;
  notification_type?: NotificationKind;
  channel?: string;
  status?: string;
  payload?: {
    class_id?: number;
    class_slug?: string;
    class_title?: string;
    start_time_utc?: string;
    start_time_local?: string;
    timezone?: string;
    teacher_name?: string;
    message?: string;
    link?: string;
  };
  timeAgo?: string;
  relative_time?: string;
  createdAt?: string;
  created_at?: string;
  scheduled_at?: string;
  delivered_at?: string;
  read_at?: string | null;
  clicked_at?: string | null;
  is_read?: boolean;
  read?: boolean;
  unread?: boolean;
}
