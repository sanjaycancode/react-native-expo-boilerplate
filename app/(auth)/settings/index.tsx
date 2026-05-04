import React from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { Stack } from "expo-router";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedSwitch } from "@/components/ThemedSwitch";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";

import { useTheme, useThemeMode } from "@/context/ThemeContext";

import {
  useNotificationPreferencesQuery,
  useUpdateNotificationPreferencesMutation,
} from "@/hooks/api";
import type { NotificationPreferences } from "@/types";

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

type BooleanNotificationPreferenceKey = {
  [Key in keyof NotificationPreferences]: NotificationPreferences[Key] extends boolean
    ? Key
    : never;
}[keyof NotificationPreferences];
type TimeNotificationPreferenceKey = "quietHoursFrom" | "quietHoursTo";

export type SettingProps = {
  title: string;
  description: string;
  value: boolean;
  onValueChange: () => void;
  isLast: boolean;
  disabled?: boolean;
};

export default function SettingsScreen() {
  const { theme } = useTheme();
  const { toggleTheme } = useThemeMode();
  const styles = createStyles(theme);
  const preferencesQuery = useNotificationPreferencesQuery();
  const updatePreferencesMutation = useUpdateNotificationPreferencesMutation();
  const [settings, setSettings] = React.useState<NotificationPreferences>(
    DEFAULT_NOTIFICATION_PREFERENCES,
  );
  const notificationControlsDisabled = preferencesQuery.isLoading;

  React.useEffect(() => {
    if (preferencesQuery.data && !updatePreferencesMutation.isPending) {
      setSettings(preferencesQuery.data);
    }
  }, [preferencesQuery.data, updatePreferencesMutation.isPending]);

  const SECTIONS = [
    {
      key: "channels",
      title: "Communication Channels",
      icon: (
        <MaterialCommunityIcons
          name="email-outline"
          size={16}
          color={theme.colors.text}
        />
      ),
      items: [
        {
          key: "emailNotifications",
          title: "Email Notifications",
          description: "Receive notifications via email for important updates",
        },
        {
          key: "pushNotifications",
          title: "Push Notifications",
          description:
            "Receive push notifications in app/browser for real time alerts",
        },
      ],
    },
    {
      key: "classes",
      title: "Classes & Booking",
      icon: (
        <MaterialCommunityIcons
          name="calendar-check-outline"
          size={16}
          color={theme.colors.text}
        />
      ),
      items: [
        {
          key: "bookingReminders",
          title: "Booking Reminders",
          description: "Remind me 1 hour before class starts",
        },
        {
          key: "reviewPrompts",
          title: "Review Prompts",
          description: "Ask me to review classes I attended",
        },
      ],
    },
    {
      key: "progress",
      title: "Progress & Learning",
      icon: (
        <MaterialCommunityIcons
          name="chart-line"
          size={16}
          color={theme.colors.text}
        />
      ),
      items: [
        {
          key: "weeklySummary",
          title: "Weekly Summary",
          description: "Send me weekly learning progress summary",
        },
        {
          key: "inactivityNudge",
          title: "Inactivity Nudge",
          description: "Remind me if I haven't been active for a while",
        },
      ],
    },
  ] as const;

  const handleToggle = (key: BooleanNotificationPreferenceKey) => {
    const previousPreferences = settings;
    const nextPreferences = {
      ...settings,
      [key]: !settings[key],
    };

    setSettings(nextPreferences);

    updatePreferencesMutation.mutate(nextPreferences, {
      onSuccess: (preferences) => {
        setSettings(preferences);
      },
      onError: (error) => {
        setSettings(previousPreferences);
        Alert.alert("Settings", getErrorMessage(error));
      },
    });
  };

  const handleTimeChange = (
    key: TimeNotificationPreferenceKey,
    value: string,
  ) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleTimeCommit = (key: TimeNotificationPreferenceKey) => {
    const normalizedTime = normalizeTimeInput(settings[key]);
    const previousPreferences =
      preferencesQuery.data ?? DEFAULT_NOTIFICATION_PREFERENCES;

    if (!normalizedTime) {
      setSettings(previousPreferences);
      Alert.alert("Settings", "Enter time in HH:MM or HH:MM:SS format.");
      return;
    }

    const nextPreferences = {
      ...settings,
      [key]: normalizedTime,
    };

    setSettings(nextPreferences);

    updatePreferencesMutation.mutate(nextPreferences, {
      onSuccess: (preferences) => {
        setSettings(preferences);
      },
      onError: (error) => {
        setSettings(previousPreferences);
        Alert.alert("Settings", getErrorMessage(error));
      },
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Settings",
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
        contentContainerStyle={styles.container}
      >
        <View>
          <ThemedText variant="heading3">Settings</ThemedText>
          <ThemedText variant="bodySmall" semantic="muted">
            Manage your notification preferences and customize how you receive
            updates
          </ThemedText>
        </View>

        {preferencesQuery.isLoading ? (
          <View style={styles.loadingRow}>
            <ActivityIndicator size="small" color={theme.colors.primary} />
            <ThemedText variant="caption" semantic="muted">
              Loading notification preferences...
            </ThemedText>
          </View>
        ) : null}

        <ThemedCard variant="outlined" style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeaderLeft}>
              <Ionicons
                name="color-palette-outline"
                size={16}
                color={theme.colors.text}
              />
              <ThemedText variant="body">Appearance</ThemedText>
            </View>
          </View>
          <View style={styles.sectionDivider} />

          <View style={styles.settingRow}>
            <View style={styles.settingCopy}>
              <ThemedText variant="body">
                {theme.mode === "dark" ? "Dark Mode" : "Light Mode"}
              </ThemedText>
              <ThemedText variant="caption" semantic="muted">
                {theme.mode === "dark"
                  ? "Dark theme is enabled"
                  : "Light theme is enabled"}
              </ThemedText>
            </View>
            <ThemedSwitch
              value={theme.mode === "dark"}
              onValueChange={toggleTheme}
            />
          </View>
        </ThemedCard>

        {SECTIONS.map((section) => (
          <ThemedCard
            key={section.key}
            variant="outlined"
            style={styles.sectionCard}
          >
            <View style={styles.sectionHeader}>
              <View style={styles.sectionHeaderLeft}>
                {section.icon}
                <ThemedText variant="body">{section.title}</ThemedText>
              </View>
            </View>
            <View style={styles.sectionDivider} />

            {section.items.map((item, idx) => (
              <SettingRow
                key={item.key}
                title={item.title}
                description={item.description}
                value={settings[item.key]}
                onValueChange={() => handleToggle(item.key)}
                isLast={idx === section.items.length - 1}
                disabled={notificationControlsDisabled}
              />
            ))}
          </ThemedCard>
        ))}

        <ThemedCard variant="outlined" style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeaderLeft}>
              <Ionicons
                name="moon-outline"
                size={16}
                color={theme.colors.text}
              />
              <ThemedText variant="body">
                Quiet Hours (Do Not Disturb)
              </ThemedText>
            </View>
          </View>
          <View style={styles.sectionDivider} />

          <View style={styles.quietRow}>
            <View style={styles.quietCopy}>
              <ThemedText variant="body">Schedule Quiet Hours</ThemedText>
              <ThemedText variant="caption" semantic="muted">
                Don't send notifications during this time range
              </ThemedText>
            </View>

            <View style={styles.quietRight}>
              <View style={styles.timeInputs}>
                <View style={styles.timeInput}>
                  <ThemedTextInput
                    label="From"
                    value={settings.quietHoursFrom}
                    placeholder="09:00"
                    keyboardType="numbers-and-punctuation"
                    maxLength={8}
                    size="sm"
                    editable={
                      settings.quietHoursEnabled &&
                      !notificationControlsDisabled
                    }
                    onChangeText={(value) =>
                      handleTimeChange("quietHoursFrom", value)
                    }
                    onBlur={() => handleTimeCommit("quietHoursFrom")}
                  />
                </View>
                <View style={styles.timeInput}>
                  <ThemedTextInput
                    label="To"
                    value={settings.quietHoursTo}
                    placeholder="17:00"
                    keyboardType="numbers-and-punctuation"
                    maxLength={8}
                    size="sm"
                    editable={
                      settings.quietHoursEnabled &&
                      !notificationControlsDisabled
                    }
                    onChangeText={(value) =>
                      handleTimeChange("quietHoursTo", value)
                    }
                    onBlur={() => handleTimeCommit("quietHoursTo")}
                  />
                </View>
              </View>

              <View style={styles.quietToggleRow}>
                <ThemedText variant="caption" semantic="muted">
                  Enable quiet hours
                </ThemedText>
                <ThemedSwitch
                  value={settings.quietHoursEnabled}
                  onValueChange={() => handleToggle("quietHoursEnabled")}
                  disabled={notificationControlsDisabled}
                />
              </View>
            </View>
          </View>

          <View style={styles.quietFooter}>
            <Ionicons
              name="information-circle-outline"
              size={14}
              color={theme.colors.textSecondary}
            />
            <ThemedText variant="caption" semantic="muted">
              Quiet hours {settings.quietHoursEnabled ? "enabled" : "disabled"}
            </ThemedText>
          </View>
        </ThemedCard>
      </ScrollView>
    </>
  );
}

function SettingRow({
  title,
  description,
  value,
  onValueChange,
  isLast,
  disabled = false,
}: SettingProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={[styles.settingRow, !isLast && styles.settingRowDivider]}>
      <View style={styles.settingCopy}>
        <ThemedText variant="body">{title}</ThemedText>
        <ThemedText variant="caption" semantic="muted">
          {description}
        </ThemedText>
      </View>
      <ThemedSwitch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
      />
    </View>
  );
}

function getErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "message" in error) {
    const { message } = error as { message?: unknown };
    if (typeof message === "string") {
      return message;
    }
  }

  return "Unable to update notification preferences.";
}

function normalizeTimeInput(value: string): string | null {
  const trimmedValue = value.trim();
  const match = /^([01]\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?$/.exec(
    trimmedValue,
  );

  if (!match) return null;

  const [, hours, minutes, seconds = "00"] = match;
  return `${hours}:${minutes}:${seconds}`;
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    scroll: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    container: {
      flexGrow: 1,
      padding: theme.spacing.lg,
      // paddingBottom: theme.spacing.xl,
      gap: theme.spacing.md,
    },
    sectionCard: {
      padding: 0,
      overflow: "hidden",
      borderRadius: theme.borderRadius.xl,
    },
    sectionHeader: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.md,
    },
    sectionHeaderLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,
    },
    sectionDivider: {
      height: 1,
      backgroundColor: theme.colors.border,
    },
    settingRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.md,
      gap: theme.spacing.md,
    },
    settingRowDivider: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    settingCopy: {
      flex: 1,
      gap: 2,
    },
    loadingRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: theme.spacing.sm,
      paddingVertical: theme.spacing.sm,
    },
    quietRow: {
      flexDirection: "column",
      alignItems: "stretch",
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.md,
      gap: theme.spacing.md,
    },
    quietCopy: {
      gap: 2,
    },
    quietRight: {
      flexDirection: "column",
      alignItems: "stretch",
      gap: theme.spacing.md,
    },
    timeInputs: {
      flexDirection: "row",
      gap: theme.spacing.sm,
    },
    timeInput: {
      flex: 1,
    },
    quietToggleRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    quietFooter: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.xs,
      paddingHorizontal: theme.spacing.md,
      paddingBottom: theme.spacing.md,
    },
  });
