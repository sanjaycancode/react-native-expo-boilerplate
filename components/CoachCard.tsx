import { Pressable, StyleSheet, View } from "react-native";

import { IconBadge } from "@/components/IconBadge";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { useCallback } from "react";import { useTheme, useThemeColors } from "@/context/ThemeContext";

type AppTheme = ReturnType<typeof useTheme>["theme"];

type Coach = {
  id: string;
  name: string;
  title: string;
  pricePerSession: number;
  nextAvailable: string;
};

type Props = {
  coach: Coach;
  onViewProfile?: () => void;
  onViewSlots?: () => void;
};

export function CoachCard({ coach, onViewProfile, onViewSlots }: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const colors = useThemeColors();

  const getAvatarInitials = useCallback((name: string) => {
    const nameParts = name.trim().split(/\s+/).filter(Boolean);
    const initials = nameParts.slice(0, 2).map(part => part[0].toUpperCase()).join('');
    return initials || name[0]?.toUpperCase() || '';
  }, []);

  return (
    <ThemedCard style={styles.card}>
      {/* Top row */}
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
          <ThemedText variant="button">{getAvatarInitials(coach.name)}</ThemedText>
        </View>

        <View style={styles.cardMain}>
          <ThemedText variant="button">{coach.name}</ThemedText>
          <ThemedText variant="bodySmall" semantic="muted">
            {coach.title}
          </ThemedText>
        </View>
      </View>

      {/* Meta info */}
      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <IconBadge name="calendar-outline" size={18} badgeSize={18} backgroundColor="transparent" />
          <ThemedText variant="bodySmall" semantic="muted">
            {coach.nextAvailable}
          </ThemedText>
        </View>

        <View style={styles.metaItem}>
          <IconBadge name="pricetag-outline" size={18} badgeSize={18} backgroundColor="transparent" />
          <ThemedText variant="bodySmall" semantic="muted">
            ${coach.pricePerSession.toFixed(2)}/session
          </ThemedText>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actionsRow}>
        <View style={styles.actionButtons}>
          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              {
                borderColor: colors.border,
                backgroundColor: colors.backgroundAlt,
                opacity: pressed ? 0.85 : 1,
              },
            ]}
            onPress={onViewProfile}
          >
            <ThemedText variant="bodySmall">View Profile</ThemedText>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              {
                backgroundColor: colors.primary,
                opacity: pressed ? 0.85 : 1,
              },
            ]}
            onPress={onViewSlots ?? (() => {})}
          >
            <ThemedText variant="bodySmall" style={{ color: "#fff" }}>
              View Slots
            </ThemedText>
          </Pressable>
        </View>
      </View>
    </ThemedCard>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    card: {
      gap: theme.spacing.sm,
    },
    cardTopRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.md,
    },
    avatar: {
      width: theme.spacing.xl,
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
    actionsRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.md,
    },
    actionButtons: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,
    },
    secondaryButton: {
      borderWidth: 1,
      borderRadius: theme.borderRadius.small,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
    },
    primaryButton: {
      borderRadius: theme.borderRadius.small,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
    },
  });
