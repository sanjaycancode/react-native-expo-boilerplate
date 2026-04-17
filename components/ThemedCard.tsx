/**
 * Theme-aware card component for displaying content
 */

import React, { useMemo } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import { useTheme, useThemeColors } from "@/context/ThemeContext";

interface ThemedCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: "default" | "elevated" | "outlined";
}

export function ThemedCard({
  children,
  style,
  variant = "default",
}: ThemedCardProps) {
  const { theme } = useTheme();
  const colors = useThemeColors();

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: colors.backgroundAlt,
          borderColor: colors.border,
        },
        elevated: {
          ...theme.shadows.medium,
        },
        outlined: {
          borderWidth: 1,
        },
      }),
    [colors, theme.shadows.medium, variant],
  );

  return (
    <View
      style={[
        styles.card,
        dynamicStyles.container,
        variant === "elevated" && dynamicStyles.elevated,
        variant === "outlined" && dynamicStyles.outlined,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 0,
  },
});
