import { useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { Stack, useLocalSearchParams } from "expo-router";

import { IconBadge } from "@/components/IconBadge";
import { StatusBadge, type StatusBadgeVariant } from "@/components/StatusBadge";
import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { useTheme, useThemeColors } from "@/context/ThemeContext";

type AppTheme = ReturnType<typeof useTheme>["theme"];

type BookingStatus = "upcoming" | "completed" | "cancelled";

type Params = {
  id?: string;
  coachName?: string;
  coachTitle?: string;
  status?: BookingStatus;
  dateLabel?: string;
  durationMinutes?: string;
  meetingType?: "Video call" | "Audio call" | "Chat";
};

const statusLabelMap = {
  upcoming: "Upcoming",
  completed: "Completed",
  cancelled: "Cancelled",
} as const satisfies Record<BookingStatus, string>;

const statusVariantMap = {
  upcoming: "primary",
  completed: "success",
  cancelled: "danger",
} as const satisfies Record<BookingStatus, StatusBadgeVariant>;

export default function BookingDetail() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const colors = useThemeColors();
  const { coachName, coachTitle, status, dateLabel, durationMinutes, meetingType } =
    useLocalSearchParams<Params>();

  const resolvedStatus: BookingStatus =
    status && ["upcoming", "completed", "cancelled"].includes(status)
      ? status
      : "upcoming";

  const initials = useMemo(() => {
    const displayName = coachName?.trim() ?? "";
    const parts = displayName.split(/\s+/).filter(Boolean);
    const computed = parts
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("");
    return computed || displayName[0]?.toUpperCase() || "?";
  }, [coachName]);

  return (
    <>
      <Stack.Screen options={{ title: "Booking Details" }} />
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedCard style={styles.headerCard}>
          <View style={styles.headerTopRow}>
            <View style={styles.headerLeft}>
              <View
                style={[
                  styles.avatar,
                  { backgroundColor: colors.overlay, borderColor: colors.border },
                ]}
              >
                <ThemedText variant="bodySmall">{initials}</ThemedText>
              </View>

              <View style={styles.headerMain}>
                <ThemedText variant="heading2">{coachName ?? "Coach"}</ThemedText>
                <ThemedText variant="bodySmall" semantic="muted">
                  {coachTitle ?? "Session"}
                </ThemedText>
              </View>
            </View>

            <StatusBadge
              label={statusLabelMap[resolvedStatus]}
              variant={statusVariantMap[resolvedStatus]}
              style={{
                paddingVertical: 4,
                paddingHorizontal: theme.spacing.sm,
              }}
              textStyle={{ fontSize: 12, lineHeight: 14 }}
            />
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <View style={styles.metaGrid}>
            <ThemedCard variant="outlined" style={styles.metaCard}>
              <View style={styles.metaRow}>
                <IconBadge
                  name="calendar-outline"
                  size={18}
                  badgeSize={18}
                  backgroundColor="transparent"
                />
                <View style={styles.metaTextCol}>
                  <ThemedText variant="caption" semantic="muted">
                    Date & time
                  </ThemedText>
                  <ThemedText variant="bodySmall">
                    {dateLabel ?? "—"}
                  </ThemedText>
                </View>
              </View>
            </ThemedCard>

            <ThemedCard variant="outlined" style={styles.metaCard}>
              <View style={styles.metaRow}>
                <IconBadge
                  name="time-outline"
                  size={18}
                  badgeSize={18}
                  backgroundColor="transparent"
                />
                <View style={styles.metaTextCol}>
                  <ThemedText variant="caption" semantic="muted">
                    Duration
                  </ThemedText>
                  <ThemedText variant="bodySmall">
                    {durationMinutes ? `${durationMinutes} min` : "—"}
                  </ThemedText>
                </View>
              </View>
            </ThemedCard>

            <ThemedCard variant="outlined" style={styles.metaCard}>
              <View style={styles.metaRow}>
                <IconBadge
                  name="videocam-outline"
                  size={18}
                  badgeSize={18}
                  backgroundColor="transparent"
                />
                <View style={styles.metaTextCol}>
                  <ThemedText variant="caption" semantic="muted">
                    Meeting type
                  </ThemedText>
                  <ThemedText variant="bodySmall">
                    {meetingType ?? "—"}
                  </ThemedText>
                </View>
              </View>
            </ThemedCard>
          </View>
        </ThemedCard>

        <ThemedCard style={styles.noteCard} variant="outlined">
          <ThemedText variant="caption" semantic="muted">
            Note
          </ThemedText>
          <ThemedText variant="bodySmall">
            This is a placeholder booking detail screen. Next step: add real booking
            data and actions (reschedule/cancel/join).
          </ThemedText>
        </ThemedCard>
      </ScrollView>
    </>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      padding: theme.spacing.md,
      gap: theme.spacing.md,
      paddingBottom: theme.spacing.xl,
    },
    headerCard: {
      gap: theme.spacing.md,
    },
    headerTopRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: theme.spacing.md,
    },
    headerLeft: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.md,
    },
    avatar: {
      width: theme.spacing.xl*2,
      height: theme.spacing.xl*2, 
      borderRadius: theme.borderRadius.full,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
    },
    headerMain: {
      flex: 1,
      gap: theme.spacing.xs,
    },
    divider: {
      height: 1,
    },
    metaGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: theme.spacing.md,
      width: "100%",
    },
    metaCard: {
      flex: 1,
      minWidth: "45%",
      borderRadius: theme.borderRadius.large,
    },
    metaRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,
    },
    metaTextCol: {
      flex: 1,
      gap: theme.spacing.xs,
    },
    noteCard: {
      gap: theme.spacing.xs,
      borderRadius: theme.borderRadius.large,
    },
  });
