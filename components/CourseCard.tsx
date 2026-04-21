import React from "react";
import {
  Image,
  StyleSheet,
  View,
} from "react-native";

import { ThemedButton } from "@/components/ThemedButton";
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
        <ThemedText variant="heading3" semantic="default">
          {title}
        </ThemedText>


        <View style={styles.metaRow}>
          <ThemedText variant="bodySmall" semantic="muted">
            {modules} Modules
          </ThemedText>
          <ThemedText variant="bodySmall" semantic="muted">
            •
          </ThemedText>
          <ThemedText variant="bodySmall" semantic="muted">
            {lessons} Lessons
          </ThemedText>
        </View>

       
        <View style={styles.progressSection}>
          <ThemedText variant="caption" semantic="muted">
            {Math.round(progress * 100)}% Complete
          </ThemedText>

         
          <View
            style={[
              styles.progressTrack,
              { backgroundColor: colors.border },
            ]}
          >
            <View
              style={[
                styles.progressFill,
                {
                  width: `${Math.round(progress * 100)}%`,
                  backgroundColor: colors.primary,
                },
              ]}
            />
          </View>
        </View>

       
        <ThemedButton
          title="Continue Learning"
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
  image: {
    width: "100%",
    height: 150,
  },
  content: {
    padding: Spacing.md,
    gap: Spacing.sm + Spacing.xs,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  progressSection: {
    gap: Spacing.xs + Spacing.xs,
  },
  progressTrack: {
    height: 8,
    borderRadius: BorderRadius.full,
    overflow: "hidden",
  },
  progressFill: {
    height: 8,
    borderRadius: BorderRadius.full,
  },
});