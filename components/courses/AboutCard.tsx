import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { BorderRadius } from "@/constants/Themes";

import { useTheme } from "@/context/ThemeContext";

interface AboutCardProps {
  description: string;
  title?: string;
}

export function AboutCard({ description, title }: AboutCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const needsTruncation = description.length > 120;
  const preview =
    needsTruncation
      ? description.substring(0, 120) + "..."
      : description;

  const toggle = () => setIsExpanded((prev) => !prev);

  return (
    <ThemedCard variant="outlined" style={styles.card}>
      <View style={styles.content}>
        <ThemedText variant="heading6" semantic="default">
          {title}
        </ThemedText>

        <ThemedText variant="bodySmall" semantic="muted">
          {isExpanded ? description : preview}
        </ThemedText>

        {needsTruncation && (
          <Pressable onPress={toggle}>
            <ThemedText variant="bodySmall" semantic="primary">
              {isExpanded ? "Show less" : "Read more"}
            </ThemedText>
          </Pressable>
        )}
      </View>
    </ThemedCard>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    card: {
      borderRadius: BorderRadius.xl,
      width: "100%",
    },
    content: {
      gap: theme.spacing.sm,
    },
  });