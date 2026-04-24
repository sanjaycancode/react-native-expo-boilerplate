import { useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { Stack, useLocalSearchParams } from "expo-router";

import { IconBadge } from "@/components/IconBadge";
import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { useTheme, useThemeColors } from "@/context/ThemeContext";

type AppTheme = ReturnType<typeof useTheme>["theme"];

function formatPrice(value: string | undefined): string {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed.toFixed(2) : "0.00";
}

type Params = {
  id?: string;
  name?: string;
  title?: string;
  nextAvailable?: string;
  pricePerSession?: string;
};

export default function CoachDetail() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const colors = useThemeColors();
  const { name, title, nextAvailable, pricePerSession } =
    useLocalSearchParams<Params>();

  const initials = useMemo(() => {
    const displayName = name?.trim() ?? "";
    const parts = displayName.split(/\s+/).filter(Boolean);
    const computed = parts
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("");
    return computed || displayName[0]?.toUpperCase() || "?";
  }, [name]);

  const slots = useMemo(
    () => [
      { id: "s1", label: nextAvailable ?? "Today • 6:30 PM" },
      { id: "s2", label: "Tomorrow • 8:00 AM" },
      { id: "s3", label: "Sat • 6:00 PM" },
      { id: "s4", label: "Sun • 9:30 AM" },
    ],
    [nextAvailable],
  );

  return (
    <>
      <Stack.Screen options={{ title: "Coach Details" }} />
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedCard style={styles.profileCard}>
          <View style={styles.profileTopRow}>
            <View
              style={[
                styles.avatar,
                { backgroundColor: colors.overlay, borderColor: colors.border },
              ]}
            >
              <ThemedText variant="bodySmall">{initials}</ThemedText>
            </View>

            <View style={styles.profileMain}>
              <ThemedText variant="heading2">{name ?? "Coach"}</ThemedText>
              <ThemedText variant="bodySmall" semantic="muted">
                {title ?? "Coach"}
              </ThemedText>
            </View>
          </View>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <IconBadge
                name="calendar-outline"
                size={18}
                badgeSize={18}
                backgroundColor="transparent"
              />
              <ThemedText variant="bodySmall" semantic="muted">
                Next available: {nextAvailable ?? "—"}
              </ThemedText>
            </View>

            <View style={styles.metaItem}>
              <IconBadge
                name="pricetag-outline"
                size={18}
                badgeSize={18}
                backgroundColor="transparent"
              />
              <ThemedText variant="bodySmall" semantic="muted">
                Price: ${formatPrice(pricePerSession)}/session
              </ThemedText>
            </View>
          </View>
        </ThemedCard>

        <View style={styles.section}>
          <ThemedText variant="heading3">Availability</ThemedText>
          <ThemedText variant="bodySmall" semantic="muted">
            Pick a time slot to continue.
          </ThemedText>
        </View>

        <View style={styles.slots}>
          {slots.map((slot) => (
            <ThemedCard key={slot.id} style={styles.slotCard} variant="outlined">
              <View style={styles.slotRow}>
                <IconBadge
                  name="time-outline"
                  size={18}
                  badgeSize={18}
                  backgroundColor="transparent"
                />
                <ThemedText variant="bodySmall">{slot.label}</ThemedText>
              </View>
            </ThemedCard>
          ))}
        </View>
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
    profileCard: {
      gap: theme.spacing.md,
    },
    profileTopRow: {
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
    profileMain: {
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
    section: {
      gap: theme.spacing.xs,
    },
    slots: {
      gap: theme.spacing.sm,
    },
    slotCard: {
      paddingVertical: theme.spacing.sm,
    },
    slotRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,
    },
  });
