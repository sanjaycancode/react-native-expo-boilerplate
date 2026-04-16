/**
 * Theme-aware card component for displaying content
 */

import { useThemeColors } from "@/context/ThemeContext";
import React, { useMemo } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

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
  const colors = useThemeColors();

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor:
            variant === "outlined" ? colors.background : colors.backgroundAlt,
          borderColor: colors.border,
        },
        elevated: {
          shadowColor: colors.text,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 4,
        },
        outlined: {
          borderWidth: 2,
        },
      }),
    [colors, variant],
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
    borderWidth: 1,
  },
});
