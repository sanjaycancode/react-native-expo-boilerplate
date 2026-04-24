import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

export type StatusBadgeVariant =
  | "primary"
  | "success"
  | "neutral"
  | "warning"
  | "danger";

type StatusBadgeProps = {
  label: string;
  variant?: StatusBadgeVariant;
  backgroundColor?: string;
  color?: string;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export function StatusBadge({
  label,
  variant = "neutral",
  backgroundColor,
  color,
  borderRadius,
  style,
  textStyle,
}: StatusBadgeProps) {
  const { theme } = useTheme();
  const variantColors = getVariantColors(theme);
  const colors = variantColors[variant];

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: backgroundColor ?? colors.backgroundColor,
          borderRadius: borderRadius ?? theme.borderRadius.full,
          paddingHorizontal: theme.spacing.xs,
        },
        style,
      ]}
    >
      <ThemedText
        variant="caption"
        style={[styles.text, { color: color ?? colors.color }, textStyle]}
      >
        {label}
      </ThemedText>
    </View>
  );
}

function getVariantColors(theme: ReturnType<typeof useTheme>["theme"]) {
  return {
    primary: {
      backgroundColor: theme.colors.background,
      color: theme.colors.primaryDark,
    },
    success: {
      backgroundColor: theme.colors.background,
      color: theme.colors.success,
    },
    neutral: {
      backgroundColor: theme.colors.background,
      color: theme.colors.textSecondary,
    },
    warning: {
      backgroundColor: theme.colors.background,
      color: "#B45309",
    },
    danger: {
      backgroundColor: theme.colors.background,
      color: "#B91C1C",
    },
  } satisfies Record<
    StatusBadgeVariant,
    { backgroundColor: string; color: string }
  >;
}

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 2,
  },
  text: {
    fontFamily: "LexendSemiBold",
    fontSize: 10,
    lineHeight: 12,
  },
});
