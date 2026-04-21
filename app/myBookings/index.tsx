import { useCallback, useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { Stack } from "expo-router";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { useTheme, useThemeColors } from "@/context/ThemeContext";

import { BorderRadius, Spacing } from "@/constants/Themes";

type AppTheme = ReturnType<typeof useTheme>["theme"];

type BookingStatus = "upcoming" | "completed" | "cancelled";

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
  const styles = createStyles();
  const navigation = useNavigation();
  const colors = useThemeColors();

  const [filter, setFilter] = useState<"all" | BookingStatus>("all");

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
            <View style={styles.header}>
              <ThemedText variant="heading2">My Bookings</ThemedText>
              <ThemedText variant="body" semantic="muted">
                View and manage your coaching sessions.
              </ThemedText>
            </View>

            <View style={styles.filtersRow}>
              <FilterChip
                label="All"
                selected={filter === "all"}
                onPress={() => setFilter("all")}
              />
              <FilterChip
                label="Upcoming"
                selected={filter === "upcoming"}
                onPress={() => setFilter("upcoming")}
              />
              <FilterChip
                label="Completed"
                selected={filter === "completed"}
                onPress={() => setFilter("completed")}
              />
              <FilterChip
                label="Cancelled"
                selected={filter === "cancelled"}
                onPress={() => setFilter("cancelled")}
              />
            </View>
          </View>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item: booking }) => {
          const statusStyles = getStatusStyles(booking.status, colors);

          return (
            <ThemedCard variant="outlined" style={styles.card}>
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
                  <ThemedText variant="button">{booking.coachName[0]}</ThemedText>
                </View>

                <View style={styles.cardMain}>
                  <ThemedText variant="button">{booking.coachName}</ThemedText>
                  <ThemedText variant="bodySmall" semantic="muted">
                    {booking.coachTitle}
                  </ThemedText>
                </View>

                <View
                  style={[
                    styles.statusPill,
                    { backgroundColor: statusStyles.backgroundColor },
                  ]}
                >
                  <ThemedText
                    variant="caption"
                    style={{ color: statusStyles.textColor }}
                  >
                    {booking.status}
                  </ThemedText>
                </View>
              </View>

              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <FontAwesome5
                    name="calendar-alt"
                    size={14}
                    color={colors.textSecondary}
                  />
                  <ThemedText variant="bodySmall" semantic="muted">
                    {booking.dateLabel}
                  </ThemedText>
                </View>
                <View style={styles.metaItem}>
                  <FontAwesome5
                    name="clock"
                    size={14}
                    color={colors.textSecondary}
                  />
                  <ThemedText variant="bodySmall" semantic="muted">
                    {booking.durationMinutes} min
                  </ThemedText>
                </View>
                <View style={styles.metaItem}>
                  <FontAwesome5
                    name="video"
                    size={14}
                    color={colors.textSecondary}
                  />
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

  function FilterChip({
    label,
    selected,
    onPress,
  }: {
    label: string;
    selected: boolean;
    onPress: () => void;
  }) {
    return (
      <Pressable
        onPress={onPress}
        style={[
          styles.filterChip,
          {
            borderColor: colors.border,
            backgroundColor: selected ? colors.primary : colors.backgroundAlt,
          },
        ]}
      >
        <ThemedText
          variant="bodySmall"
          style={{ color: selected ? colors.textOnPrimary : colors.text }}
        >
          {label}
        </ThemedText>
      </Pressable>
    );
  }
}

function getStatusStyles(
  status: BookingStatus,
  colors: ReturnType<typeof useThemeColors>,
) {
  switch (status) {
    case "upcoming":
      return { backgroundColor: colors.info, textColor: colors.textOnPrimary };
    case "completed":
      return { backgroundColor: colors.success, textColor: colors.textOnPrimary };
    case "cancelled":
      return { backgroundColor: colors.error, textColor: colors.textOnPrimary };
  }
}

const createStyles = () =>
{
  const {theme} = useTheme();

 return StyleSheet.create({
    container: {
      padding: theme.spacing.lg,
    },
    headerBlock: {
      gap: theme.spacing.lg,
      marginBottom: theme.spacing.lg,
    },
    header: {
      gap: theme.spacing.sm,
    },
    filtersRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: theme.spacing.xs,
    },
    filterChip: {
      borderWidth: 1,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      borderRadius: BorderRadius.full,
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
      width: theme.spacing.lg,
      height: theme.spacing.lg,
      borderRadius: theme.borderRadius.large,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
    },
    cardMain: {
      flex: 1,
      gap: theme.spacing.xs,
    },
    statusPill: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      borderRadius: BorderRadius.full,
      alignItems: "center",
      justifyContent: "center",
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

}