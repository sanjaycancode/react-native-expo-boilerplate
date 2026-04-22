import React, { useState } from "react";
import { Pressable, StyleSheet } from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";
import { BorderRadius, Spacing } from "@/constants/Themes";
import { useThemeColors } from "@/context/ThemeContext";

interface AboutCardProps {
  description: string;
  title?: string;
}

export function AboutCard({ description, title = "About This Course" }: AboutCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const colors = useThemeColors();

  const preview = description.length > 60
    ? description.substring(0, 60) + "..."
    : description;

  return (
    <ThemedCard variant="outlined" style={styles.card}>
      <Pressable
        onPress={() => setIsExpanded(!isExpanded)}
        style={styles.headerRow}
      >
        <ThemedText variant="body" semantic="primary">
          {title}
        </ThemedText>
        <FontAwesome
          name={isExpanded ? "chevron-up" : "chevron-down"}
          size={14}
          color={colors.textSecondary}
        />
      </Pressable>
      <ThemedText variant="caption" semantic="default">
        {isExpanded ? description : preview}
      </ThemedText>
    </ThemedCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: Spacing.xs,
    borderRadius: BorderRadius.xl,
    width: "100%",
    paddingVertical: Spacing.sm,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});