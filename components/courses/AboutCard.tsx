import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";
import { BorderRadius, Spacing } from "@/constants/Themes";
import { useThemeColors } from "@/context/ThemeContext";

interface AboutCardProps {
  description: string;
  title?: string;
}

export function AboutCard({ description, title }: AboutCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const colors = useThemeColors();

  const preview =
    description.length > 60
      ? description.substring(0, 60) + "..."
      : description;

  const toggle = () => setIsExpanded((prev) => !prev);

  return (
    <Pressable onPress={toggle}>
      <ThemedCard variant="outlined" style={styles.card}>
        <View style={styles.contentCol}>
          <View style={styles.headerRow}>
            <ThemedText variant="body" semantic="primary">
              {title}
            </ThemedText>
          </View>

          <ThemedText variant="caption" semantic="default">
            {isExpanded ? description : preview}
          </ThemedText>
        </View>

        <View style={styles.chevronCol}>
          <FontAwesome
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={14}
            color={colors.textSecondary}
          />
        </View>
      </ThemedCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: Spacing.sm,
    borderRadius: BorderRadius.xl,
    width: "100%",
    paddingVertical: Spacing.sm,
    flexDirection: "row",
  },
  contentCol: {
    flex: 1,
    gap: Spacing.xs,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chevronCol: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: Spacing.xs,
  },
});
