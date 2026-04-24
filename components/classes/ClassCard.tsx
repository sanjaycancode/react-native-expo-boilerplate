import React from "react";
import { Image, StyleSheet, View } from "react-native";

import { ThemedButton } from "@/components/ThemedButton";
import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { BorderRadius, Spacing } from "@/constants/Themes";

import { useThemeColors } from "@/context/ThemeContext";

interface ClassCardProps {
  family: string;
  variant: string;
  title: string;
  date: string;
  time: string;
  image: string;
  onPress: () => void;
}

export function ClassCard({
  family,
  variant,
  title,
  date,
  time,
  image,
  onPress,
}: ClassCardProps) {
  const colors = useThemeColors();

  return (
    <ThemedCard
      variant="outlined"
      style={styles.card}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.badgeRow}>
          <View style={[styles.badge, { backgroundColor: colors.info }]}>
            <ThemedText variant="caption" style={styles.badgeText}>
              {family}
            </ThemedText>
          </View>
          <View style={[styles.badge, { backgroundColor: colors.warning }]}>
            <ThemedText variant="caption" style={styles.badgeTextSecondary}>
              {variant}
            </ThemedText>
          </View>
        </View>
      </View>

      <View style={styles.content}>

        <ThemedText variant="heading3" semantic="default">
          {title}
        </ThemedText>

        <View style={styles.metaRow}>
          <ThemedText variant="bodySmall" semantic="muted">
            {date}
          </ThemedText>
          <ThemedText variant="bodySmall" semantic="muted">
            •
          </ThemedText>
          <ThemedText variant="bodySmall" semantic="muted">
            {time}
          </ThemedText>
        </View>

        <ThemedButton
          title="View Details"
          onPress={onPress}
          size="medium"
        />
      </View>
    </ThemedCard>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    alignSelf: "center",
    width: "100%",
    padding: 0,
    borderRadius: BorderRadius.large,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 140,
  },
  content: {
    padding: Spacing.md,
    gap: Spacing.sm + Spacing.xs,
  },
  badgeRow: {
    position: "absolute",
    top: Spacing.sm + Spacing.xs,
    left: Spacing.sm + Spacing.xs,
    flexDirection: "row",
    gap: Spacing.xs + Spacing.xs,
  },
  badge: {
    paddingHorizontal: Spacing.sm + Spacing.xs,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.medium,
    opacity: 0.85,
  },
  badgeText: {
    color: "#fff",
  },
  badgeTextSecondary: {
    color: "#fff",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
});