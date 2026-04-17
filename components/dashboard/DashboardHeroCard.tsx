import { Pressable, StyleSheet, View } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import type { ViewStyle } from "react-native";

import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

type DashboardHeroCardProps = {
  eyebrow: string;
  title: string;
  primaryActionLabel: string;
  secondaryActionLabel: string;
  style?: ViewStyle;
};

function withOpacity(hexColor: string, opacity: number) {
  const alpha = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0");

  return `${hexColor}${alpha}`;
}

export function DashboardHeroCard({
  eyebrow,
  title,
  primaryActionLabel,
  secondaryActionLabel,
  style,
}: DashboardHeroCardProps) {
  const { theme } = useTheme();
  const colors = theme.colors;
  const styles = createStyles(theme);
   
  return (
    <View style={[styles.card, style]}>
      <View style={styles.copy}>
        <ThemedText style={styles.eyebrow}>{eyebrow}</ThemedText>
        <ThemedText style={styles.title}>{title}</ThemedText>
      </View>

      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.pressed,
          ]}
        >
          <ThemedText style={styles.primaryButtonText}>
            {primaryActionLabel}
          </ThemedText>
          <View style={styles.primaryIcon}>
            <Ionicons name="arrow-forward" size={18} color={colors.primary} />
          </View>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.secondaryButton,
            pressed && styles.pressed,
          ]}
        >
          <ThemedText style={styles.secondaryButtonText}>
            {secondaryActionLabel}
          </ThemedText>
          <Ionicons name="flash" size={18} color={colors.textOnPrimary} />
        </Pressable>
      </View>
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) => {
  const colors = theme.colors;

  return StyleSheet.create({
    card: {
      backgroundColor: colors.primary,
      borderRadius: 34,
      gap: theme.spacing.lg,
      overflow: "hidden",
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.lg,
    },
    copy: {
      gap: theme.spacing.sm + 2,
    },
    eyebrow: {
      alignSelf: "flex-start",
      backgroundColor: withOpacity(colors.textOnPrimary, 0.16),
      borderRadius: theme.borderRadius.full,
      color: withOpacity(colors.textOnPrimary, 0.76),
      fontFamily: "LexendBold",
      fontSize: 10,
      letterSpacing: 3,
      lineHeight: 14,
      overflow: "hidden",
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.xs + 2,
      textTransform: "uppercase",
    },
    title: {
      color: colors.textOnPrimary,
      fontFamily: "LexendBold",
      fontSize: 22,
      lineHeight: 29,
      maxWidth: 250,
    },
    actions: {
      gap: theme.spacing.sm + 2,
    },
    primaryButton: {
      alignItems: "center",
      backgroundColor: colors.surface,
      borderRadius: theme.borderRadius.full,
      flexDirection: "row",
      justifyContent: "space-between",
      minHeight: 58,
      paddingLeft: theme.spacing.lg,
      paddingRight: theme.spacing.sm,
    },
    primaryButtonText: {
      color: colors.primary,
      fontFamily: "LexendBold",
      fontSize: 14,
      lineHeight: 20,
    },
    primaryIcon: {
      alignItems: "center",
      backgroundColor: withOpacity(colors.primaryLight, 0.24),
      borderRadius: theme.borderRadius.full,
      height: 36,
      justifyContent: "center",
      width: 36,
    },
    secondaryButton: {
      alignItems: "center",
      backgroundColor: withOpacity(colors.textOnPrimary, 0.2),
      borderRadius: theme.borderRadius.full,
      flexDirection: "row",
      justifyContent: "space-between",
      minHeight: 54,
      paddingHorizontal: theme.spacing.lg,
    },
    secondaryButtonText: {
      color: withOpacity(colors.textOnPrimary, 0.92),
      fontFamily: "LexendBold",
      fontSize: 14,
      lineHeight: 20,
    },
    pressed: {
      opacity: 0.82,
      transform: [{ scale: 0.99 }],
    },
  });
};
