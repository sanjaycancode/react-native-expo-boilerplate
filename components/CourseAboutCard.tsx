import React from "react";
import { StyleSheet } from "react-native";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";
import { BorderRadius, Spacing } from "@/constants/Themes";

interface CourseAboutCardProps {
  description: string;
}

export function CourseAboutCard({ description }: CourseAboutCardProps) {
  return (
    <ThemedCard variant="outlined" style={styles.card}>
      <ThemedText variant="heading3" semantic="default">
        About This Course
      </ThemedText>
      <ThemedText
        variant="body"
        semantic="default"
        style={styles.justifyText}
      >
        {description}
      </ThemedText>
    </ThemedCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: Spacing.md,
    borderRadius: BorderRadius.large,
  },
  justifyText: {
    textAlign: "justify",
  },
});