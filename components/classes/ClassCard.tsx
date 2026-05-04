import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { StatusBadge } from "@/components/classes/StatusBadgeClass";
import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { BorderRadius, Spacing } from "@/constants/Themes";

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
  return (
    <Pressable onPress={onPress}>
      <ThemedCard variant="outlined" style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.badgeRow}>
            <StatusBadge label={family} type="family" />
            <StatusBadge label={variant} type="variant" />
          </View>
        </View>
        <View style={styles.content}>
          <ThemedText variant="heading6" semantic="default" numberOfLines={2}>
            {title}
          </ThemedText>
          <View style={styles.metaRow}>
            <ThemedText variant="caption" semantic="muted">
              {date}
            </ThemedText>
            <ThemedText variant="caption" semantic="muted">
              •
            </ThemedText>
            <ThemedText variant="caption" semantic="muted">
              {time}
            </ThemedText>
          </View>
        </View>
      </ThemedCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    width: "100%",
    padding: 0,
    borderRadius: BorderRadius.xl,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 140,
  },
  content: {
    padding: Spacing.sm,
    gap: Spacing.xs,
  },
  badgeRow: {
    position: "absolute",
    top: Spacing.xs,
    left: Spacing.xs,
    flexDirection: "row",
    gap: Spacing.xs,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
});