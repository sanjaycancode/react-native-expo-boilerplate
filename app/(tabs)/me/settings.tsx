import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Switch, View } from "react-native";

import { Stack, useRouter } from "expo-router";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { ThemedButton } from "@/components/ThemedButton";
import { ThemedCard } from "@/components/ThemedCard";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

export default function SettingsScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme.mode]);

  const initialState = useMemo(
    () => ({
      emailNotifications: true,
      pushNotifications: false,
      bookingReminders: true,
      reviewPrompts: true,
      weeklySummary: true,
      inactivityNudge: true,
      celebrationSound: true,
      quietHoursEnabled: false,
      quietHoursFrom: "09:00",
      quietHoursTo: "17:00",
    }),
    [],
  );

  const [settings, setSettings] = useState(initialState);

  const SECTIONS = useMemo(
    () => [
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
            key: "emailNotifications" as const,
            title: "Email Notifications",
            description:
              "Receive notifications via email for important updates",
          },
          {
            key: "pushNotifications" as const,
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
            key: "bookingReminders" as const,
            title: "Booking Reminders",
            description: "Remind me 1 hour before class starts",
          },
          {
            key: "reviewPrompts" as const,
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
            key: "weeklySummary" as const,
            title: "Weekly Summary",
            description: "Send me weekly learning progress summary",
          },
          {
            key: "inactivityNudge" as const,
            title: "Inactivity Nudge",
            description: "Remind me if I haven't been active for a while",
          },
        ],
      },
      {
        key: "celebrations",
        title: "Celebrations",
        icon: (
          <MaterialCommunityIcons
            name="party-popper"
            size={16}
            color={theme.colors.text}
          />
        ),
        items: [
          {
            key: "celebrationSound" as const,
            title: "Celebration Sound",
            description: "Play a short chime for milestones and achievements",
          },
        ],
      },
    ],
    [theme.colors.text],
  );

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <ThemedSafeAreaView>
      <Stack.Screen
        options={{
          title: "Notification Settings",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.headerCopy}>
          <ThemedText variant="heading3">Notification Settings</ThemedText>
          <ThemedText variant="bodySmall" semantic="muted">
            Manage your notification preferences and customize how you receive
            updates
          </ThemedText>
        </View>

        {SECTIONS.map((section) => (
          <ThemedCard
            key={section.key}
            variant="outlined"
            style={styles.sectionCard}
          >
            <View style={styles.sectionHeader}>
              <View style={styles.sectionHeaderLeft}>
                {section.icon}
                <ThemedText variant="button">{section.title}</ThemedText>
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
              <ThemedText variant="button">
                Quiet Hours (Do Not Disturb)
              </ThemedText>
            </View>
          </View>
          <View style={styles.sectionDivider} />

          <View style={styles.quietRow}>
            <View style={styles.quietCopy}>
              <ThemedText variant="button">Schedule Quiet Hours</ThemedText>
              <ThemedText variant="caption" semantic="muted">
                Don't send notifications during this time range
              </ThemedText>
            </View>

            <View style={styles.quietRight}>
              <View style={styles.timePills}>
                <View style={styles.timePill}>
                  <ThemedText variant="caption" semantic="muted">
                    From
                  </ThemedText>
                  <ThemedText variant="button">
                    {settings.quietHoursFrom}
                  </ThemedText>
                </View>
                <View style={styles.timePill}>
                  <ThemedText variant="caption" semantic="muted">
                    To
                  </ThemedText>
                  <ThemedText variant="button">
                    {settings.quietHoursTo}
                  </ThemedText>
                </View>
              </View>

              <View style={styles.quietToggleRow}>
                <ThemedText variant="caption" semantic="muted">
                  Enable quiet hours
                </ThemedText>
                <Switch
                  value={settings.quietHoursEnabled}
                  onValueChange={() => handleToggle("quietHoursEnabled")}
                  trackColor={{
                    false: theme.colors.border,
                    true: theme.colors.primary,
                  }}
                  thumbColor={
                    settings.quietHoursEnabled
                      ? theme.colors.primaryLight
                      : theme.colors.textSecondary
                  }
                  ios_backgroundColor={theme.colors.border}
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

        <View style={styles.footerActions}>
          <ThemedButton
            title="Cancel"
            variant="secondary"
            size="medium"
            onPress={() => {
              setSettings(initialState);
              router.back();
            }}
          />
          <ThemedButton
            title="Save Changes"
            variant="primary"
            size="medium"
            onPress={() => router.back()}
          />
        </View>
      </ScrollView>
    </ThemedSafeAreaView>
  );
}

function SettingRow({
  title,
  description,
  value,
  onValueChange,
  isLast,
}: {
  title: string;
  description: string;
  value: boolean;
  onValueChange: () => void;
  isLast: boolean;
}) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme.mode]);

  return (
    <View style={[styles.settingRow, !isLast && styles.settingRowDivider]}>
      <View style={styles.settingCopy}>
        <ThemedText variant="button">{title}</ThemedText>
        <ThemedText variant="caption" semantic="muted">
          {description}
        </ThemedText>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{
          false: theme.colors.border,
          true: theme.colors.primary,
        }}
        thumbColor={
          value ? theme.colors.primaryLight : theme.colors.textSecondary
        }
        ios_backgroundColor={theme.colors.border}
      />
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.lg,
      paddingBottom: theme.spacing.lg,
      gap: theme.spacing.md,
    },
    headerButton: {
      marginRight: theme.spacing.sm,
    },
    headerCopy: {
      gap: 4,
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
    timePills: {
      flexDirection: "column",
      gap: theme.spacing.sm,
    },
    timePill: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.overlay,
      borderRadius: theme.borderRadius.medium,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      alignItems: "flex-start",
      gap: 2,
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
    footerActions: {
      flexDirection: "row",
      justifyContent: "flex-end",
      gap: theme.spacing.sm,
      paddingTop: theme.spacing.sm,
    },
  });
