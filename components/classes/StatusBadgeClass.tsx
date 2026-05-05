import React from "react";
import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";

import { BorderRadius, Spacing } from "@/constants/Themes";

import { useThemeColors } from "@/context/ThemeContext";

interface StatusBadgeProps {
  label: string;
  type: "family" | "variant" | "price";
}

export function StatusBadge({ label, type }: StatusBadgeProps) {
  const colors = useThemeColors();

  const colorMap = {
    family: colors.info,
    variant: colors.primary,
    price: colors.warning,
  };

  return (
    <View style={[styles.badge, { backgroundColor: colorMap[type] }]}>
      <ThemedText variant="caption" style={styles.text}>
        {label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.small,
    opacity: 0.85,
  },
  text: {
    color: "#fff",
    fontSize: 10,
  },
});