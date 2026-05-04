import { apiClient } from "@/api/client";

import type {
  ApiNotificationPreferences,
  NotificationPreferences,
  UpdateNotificationPreferencesPayload,
} from "@/types";

type ApiNotificationPreferencesResponse =
  | ApiNotificationPreferences
  | {
      success?: boolean;
      data?: Partial<ApiNotificationPreferences>;
    };

const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferences = {
  emailNotifications: true,
  pushNotifications: false,
  bookingReminders: true,
  reviewPrompts: true,
  weeklySummary: true,
  inactivityNudge: true,
  quietHoursEnabled: false,
  quietHoursFrom: "09:00",
  quietHoursTo: "17:00",
  timezone: "UTC",
  frequency: "normal",
};

const NOTIFICATION_PREFERENCE_ENDPOINT = "/notifications/preferences";

function normalizeNotificationPreferences(
  payload: ApiNotificationPreferencesResponse,
): NotificationPreferences {
  const preferencePayload = isWrappedNotificationPreferencesResponse(payload)
    ? payload.data
    : payload;

  return mapApiPreferencesToNotificationPreferences(preferencePayload ?? {});
}

function isWrappedNotificationPreferencesResponse(
  payload: ApiNotificationPreferencesResponse,
): payload is { success?: boolean; data?: Partial<ApiNotificationPreferences> } {
  return typeof payload === "object" && payload !== null && "data" in payload;
}

function mapApiPreferencesToNotificationPreferences(
  preferences: Partial<ApiNotificationPreferences>,
): NotificationPreferences {
  const quietHoursFrom =
    preferences.quiet_hours_start ??
    DEFAULT_NOTIFICATION_PREFERENCES.quietHoursFrom;
  const quietHoursTo =
    preferences.quiet_hours_end ?? DEFAULT_NOTIFICATION_PREFERENCES.quietHoursTo;

  return {
    emailNotifications:
      preferences.email_enabled ??
      DEFAULT_NOTIFICATION_PREFERENCES.emailNotifications,
    pushNotifications:
      preferences.push_enabled ??
      DEFAULT_NOTIFICATION_PREFERENCES.pushNotifications,
    bookingReminders:
      preferences.booking_reminders_enabled ??
      DEFAULT_NOTIFICATION_PREFERENCES.bookingReminders,
    reviewPrompts:
      preferences.review_prompts_enabled ??
      DEFAULT_NOTIFICATION_PREFERENCES.reviewPrompts,
    weeklySummary:
      preferences.weekly_summary_enabled ??
      DEFAULT_NOTIFICATION_PREFERENCES.weeklySummary,
    inactivityNudge:
      preferences.inactivity_nudge_enabled ??
      DEFAULT_NOTIFICATION_PREFERENCES.inactivityNudge,
    quietHoursEnabled: Boolean(
      preferences.quiet_hours_start && preferences.quiet_hours_end,
    ),
    quietHoursFrom,
    quietHoursTo,
    timezone: preferences.timezone ?? DEFAULT_NOTIFICATION_PREFERENCES.timezone,
    frequency:
      preferences.frequency ?? DEFAULT_NOTIFICATION_PREFERENCES.frequency,
  };
}

function mapNotificationPreferencesToApiPayload(
  preferences: UpdateNotificationPreferencesPayload,
): ApiNotificationPreferences {
  return {
    email_enabled: preferences.emailNotifications,
    push_enabled: preferences.pushNotifications,
    booking_reminders_enabled: preferences.bookingReminders,
    review_prompts_enabled: preferences.reviewPrompts,
    weekly_summary_enabled: preferences.weeklySummary,
    inactivity_nudge_enabled: preferences.inactivityNudge,
    quiet_hours_start: preferences.quietHoursEnabled
      ? preferences.quietHoursFrom
      : null,
    quiet_hours_end: preferences.quietHoursEnabled
      ? preferences.quietHoursTo
      : null,
    timezone: preferences.timezone,
    frequency: preferences.frequency,
  };
}

export async function getNotificationPreferences() {
  const response = await apiClient.get<ApiNotificationPreferencesResponse>(
    NOTIFICATION_PREFERENCE_ENDPOINT,
  );

  return normalizeNotificationPreferences(response.data);
}

export async function updateNotificationPreferences(
  payload: UpdateNotificationPreferencesPayload,
) {
  const response = await apiClient.put<ApiNotificationPreferencesResponse>(
    NOTIFICATION_PREFERENCE_ENDPOINT,
    mapNotificationPreferencesToApiPayload(payload),
  );

  return normalizeNotificationPreferences(response.data);
}
