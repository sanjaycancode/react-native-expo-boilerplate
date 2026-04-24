import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import { ProgressTrack } from "@/components/ProgressTrack";
import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { BorderRadius, Spacing } from "@/constants/Themes";
import { useThemeColors } from "@/context/ThemeContext";


interface CourseCardProps {
  title: string;
  modules: number;
  lessons: number;
  progress: number;
  image: string;
  onPress: () => void;
}

export function CourseCard({
  title,
  modules,
  lessons,
  progress,
  image,
  onPress,
}: CourseCardProps) {


  const colors = useThemeColors();

  return (
    <Pressable onPress={onPress}>
      <ThemedCard
        variant="outlined"
        style={styles.card}
      >
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.content}>
          <ThemedText variant="heading6" semantic="default" numberOfLines={2}>
            {title}
          </ThemedText>
          <View style={styles.metaRow}>
            <ThemedText variant="caption" semantic="muted">
              {modules} Modules
            </ThemedText>
            <ThemedText variant="caption" semantic="muted">
              •
            </ThemedText>
            <ThemedText variant="caption" semantic="muted">
              {lessons} Lessons
            </ThemedText>
          </View>
          <View style={styles.progressSection}>
            <ThemedText variant="caption" semantic="muted">
              {Math.round(progress * 100)}% Complete
            </ThemedText>
            <ProgressTrack
              progress={Math.round(progress * 100)}
              height={6}
            />
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
  image: {
    width: "100%",
    height: 140,
  },
  content: {
    padding: Spacing.sm,
    gap: Spacing.xs,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  progressSection: {
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
});