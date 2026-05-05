export interface NotificationPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  bookingReminders: boolean;
  reviewPrompts: boolean;
  weeklySummary: boolean;
  inactivityNudge: boolean;
  quietHoursEnabled: boolean;
  quietHoursFrom: string;
  quietHoursTo: string;
  timezone: string;
  frequency: string;
}

export type UpdateNotificationPreferencesPayload = NotificationPreferences;

export interface ApiNotificationPreferences {
  email_enabled: boolean;
  push_enabled: boolean;
  booking_reminders_enabled: boolean;
  review_prompts_enabled: boolean;
  weekly_summary_enabled: boolean;
  inactivity_nudge_enabled: boolean;
  quiet_hours_start: string | null;
  quiet_hours_end: string | null;
  timezone: string;
  frequency: string;
}
