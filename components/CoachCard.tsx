import { useCallback } from "react";
import { StyleSheet, View } from "react-native";

import { IconBadge } from "@/components/IconBadge";
import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { useTheme, useThemeColors } from "@/context/ThemeContext";

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
};

export function CoachCard({ coach }: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const colors = useThemeColors();

  const getAvatarInitials = useCallback((name: string) => {
    const nameParts = name.trim().split(/\s+/).filter(Boolean);
    const initials = nameParts
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("");
    return initials || name[0]?.toUpperCase() || "";
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
          <ThemedText variant="bodySmall">{getAvatarInitials(coach.name)}</ThemedText>
        </View>

        <View style={styles.cardMain}>
          <ThemedText variant="bodySmall">{coach.name}</ThemedText>
          <ThemedText variant="bodySmall" semantic="muted">
            {coach.title}
          </ThemedText>
        </View>
      </View>

      {/* Meta info */}
      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <IconBadge
            name="calendar-outline"
            size={18}
            badgeSize={18}
            backgroundColor="transparent"
          />
          <ThemedText variant="bodySmall" semantic="muted">
            {coach.nextAvailable}
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
            ${coach.pricePerSession.toFixed(2)}/session
          </ThemedText>
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
      width: theme.spacing.lg*2,
      height: theme.spacing.lg*2,
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
  });
