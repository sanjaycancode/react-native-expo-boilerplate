/**
 * Theme-aware card component for displaying content
 */

import React, { useMemo } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { useTheme, useThemeColors } from "@/context/ThemeContext";

interface ThemedCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: "default" | "elevated" | "outlined";
}

export function ThemedCard({
  children,
  style,
  variant = "outlined",
}: ThemedCardProps) {
  const { theme } = useTheme();
  const colors = useThemeColors();

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        card: {
          borderRadius: theme.borderRadius.large,
          padding: theme.spacing.md,
          borderWidth: 0,
        },
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
    [
      colors.backgroundAlt,
      colors.border,
      theme.borderRadius.large,
      theme.spacing.md,
      theme.shadows.medium,
    ],
  );

  return (
    <View
      style={[
        dynamicStyles.card,
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
