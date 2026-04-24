import { useCallback, useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { Stack } from "expo-router";

import { IconBadge } from "@/components/IconBadge";
import { StatusBadge, StatusBadgeVariant } from "@/components/StatusBadge";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedMaterialTopTabs } from "@/components/ThemedMaterialTopTabs";
import { ThemedText } from "@/components/ThemedText";

import { useTheme, useThemeColors } from "@/context/ThemeContext";

type AppTheme = ReturnType<typeof useTheme>["theme"];

type BookingStatus = "upcoming" | "completed" | "cancelled";

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

type Booking = {
  id: string;
  coachName: string;
  coachTitle: string;
  status: BookingStatus;
  dateLabel: string;
  durationMinutes: number;
  meetingType: "Video call" | "Audio call" | "Chat";
};

export default function MyBookingsScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation();
  const colors = useThemeColors();

  const [filter, setFilter] = useState<"all" | BookingStatus>("all");

  const getAvatarInitials = useCallback((name: string) => {
    const nameParts = name.trim().split(/\s+/).filter(Boolean);
    const initials = nameParts.slice(0, 2).map(part => part[0].toUpperCase()).join('');
    return initials || name[0]?.toUpperCase() || '';
  }, []);

  const bookings: Booking[] = useMemo(
    () => [
      {
        id: "b1",
        coachName: "Aarav Sharma",
        coachTitle: "IELTS Speaking ● Fluency",
        status: "upcoming",
        dateLabel: "Today ● 6:30 PM",
        durationMinutes: 30,
        meetingType: "Video call",
      },
      {
        id: "b5",
        coachName: "Daniel Kim",
        coachTitle: "IELTS Writing ● Coherence",
        status: "upcoming",
        dateLabel: "Apr 06 ● 7:15 PM",
        durationMinutes: 30,
        meetingType: "Video call",
      },
      {
        id: "b2",
        coachName: "Maya Thapa",
        coachTitle: "Grammar ● Writing",
        status: "completed",
        dateLabel: "Apr 12 ● 8:00 AM",
        durationMinutes: 45,
        meetingType: "Audio call",
      },
      {
        id: "b3",
        coachName: "Liam Nguyen",
        coachTitle: "IELTS Reading ● Strategy",
        status: "cancelled",
        dateLabel: "Apr 06 ● 7:15 PM",
        durationMinutes: 30,
        meetingType: "Video call",
      },
      {
        id: "b4",
        coachName: "Sophia Lee",
        coachTitle: "Speaking Practice ● Fluency",
        status: "completed",
        dateLabel: "Apr 06 ● 7:15 PM",
        durationMinutes: 30,
        meetingType: "Video call",
      },
      {
        id: "b6",
        coachName: "Olivia Martinez",
        coachTitle: "Interview Prep ● Confidence",
        status: "cancelled",
        dateLabel: "Apr 06 ● 7:15 PM",
        durationMinutes: 30,
        meetingType: "Video call",
      },
    ],
    [],
  );

  const filteredBookings = useMemo(() => {
    if (filter === "all") return bookings;
    return bookings.filter((booking) => booking.status === filter);
  }, [bookings, filter]);

  useFocusEffect(
    useCallback(() => {
      const parent = navigation.getParent();
      parent?.setOptions({ tabBarStyle: { display: "none" } });

      return () => {
        parent?.setOptions({ tabBarStyle: undefined });
      };
    }, [navigation]),
  );

  return (
    <>
      <Stack.Screen options={{ title: "My Bookings" }} />
      <FlatList
        data={filteredBookings}
        keyExtractor={(booking) => booking.id}
        contentContainerStyle={styles.container}
        ListHeaderComponent={
          <View style={styles.headerBlock}>
            {/* <View style={styles.header}>
              <ThemedText variant="heading2">My Bookings</ThemedText>
              <ThemedText variant="body" semantic="muted">
                View and manage your coaching sessions.
              </ThemedText>
            </View> */}

            <ThemedMaterialTopTabs
              tabs={["all", "upcoming", "completed", "cancelled"] as const}
              selectedTab={filter}
              onSelectTab={setFilter}
              getLabel={(tab) => tab.charAt(0).toUpperCase() + tab.slice(1)}
            />
          </View>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item: booking }) => {
          return (
            <ThemedCard style={styles.card}>
              <View style={styles.cardTopRow}>
                <View
                  style={[
                    styles.avatar,
                    {
                      backgroundColor: colors.overlay,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <ThemedText variant="button">{getAvatarInitials(booking.coachName)}</ThemedText>
                </View>

                <View style={styles.cardMain}>
                  <ThemedText variant="button">{booking.coachName}</ThemedText>
                  <ThemedText variant="bodySmall" semantic="muted">
                    {booking.coachTitle}
                  </ThemedText>
                </View>

                <StatusBadge
                  label={statusLabelMap[booking.status]}
                  variant={statusVariantMap[booking.status]}
                />
              </View>

              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <IconBadge name="calendar-outline" size={18} badgeSize={18} backgroundColor="transparent" />
                  <ThemedText variant="bodySmall" semantic="muted">
                    {booking.dateLabel}
                  </ThemedText>
                </View>
                <View style={styles.metaItem}>
                  <IconBadge name="time-outline" size={18} badgeSize={18} backgroundColor="transparent" />
                  <ThemedText variant="bodySmall" semantic="muted">
                    {booking.durationMinutes} min
                  </ThemedText>
                </View>
                <View style={styles.metaItem}>
                  <IconBadge name="videocam-outline" size={18} badgeSize={18} backgroundColor="transparent" />
                  <ThemedText variant="bodySmall" semantic="muted">
                    {booking.meetingType}
                  </ThemedText>
                </View>
              </View>
            </ThemedCard>
          );
        }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <ThemedText variant="button">No bookings</ThemedText>
            <ThemedText variant="bodySmall" semantic="muted">
              Try a different filter.
            </ThemedText>
          </View>
        }
      />
    </>
  );


}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      padding: theme.spacing.md,
    },
    headerBlock: {
      gap: theme.spacing.md,
      marginBottom: theme.spacing.md,
    },
    header: {
      gap: theme.spacing.sm,
    },

    separator: {
      height: theme.spacing.md,
    },
    card: {
      gap: theme.spacing.md,
      padding: theme.spacing.lg,
    },
    cardTopRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.md,
    },
    avatar: {
      width:theme.spacing.xl,
      height: theme.spacing.xl,
      borderRadius: theme.borderRadius.full,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
    },
    cardMain: {
      flex: 1,
      gap: theme.spacing.xs,
    },

    metaRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: theme.spacing.md,
      alignItems: "center",
    },
    metaItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.xs,
    },
    empty: {
      paddingTop: theme.spacing.sm,
      gap: theme.spacing.xs,
      alignItems: "center",
    },
  });