import React from "react";
import { StyleSheet, View } from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";

import { ThemedButton } from "@/components/ThemedButton";
import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { useTheme, useThemeColors } from "@/context/ThemeContext";

interface LessonCardProps {
  lessonNumber: number;
  title: string;
  type: string;
  durationMinutes: number;
  isCompleted: boolean;
  onPress: () => void;
}

export function LessonCard({
  lessonNumber,
  title,
  type,
  durationMinutes,
  isCompleted,
  onPress,
}: LessonCardProps) {
  const { theme } = useTheme();
  const colors = useThemeColors();
  const styles = createStyles(theme);

  const getTypeIcon = (lessonType: string) => {
    switch (lessonType) {
      case "video_embed":
        return "play-circle";
      case "text":
        return "book";
      default:
        return "file";
    }
  };

  const getTypeColor = (lessonType: string) => {
    switch (lessonType) {
      case "video_embed":
        return colors.accent;
      case "text":
        return colors.warning;
      default:
        return colors.textSecondary;
    }
  };

  return (
    <ThemedCard variant="outlined" style={styles.lessonCard}>
      <View style={styles.lessonHeader}>
        <View style={styles.lessonNumber}>
          <FontAwesome
            name={isCompleted ? "check-circle" : "circle"}
            size={20}
            color={isCompleted ? colors.success : colors.textTertiary}
          />
          <ThemedText
            variant="heading6"
            semantic="default"
          >
            Lesson {lessonNumber}
          </ThemedText>
        </View>

        <View style={styles.lessonMeta}>
          <FontAwesome
            name={getTypeIcon(type)}
            size={14}
            color={getTypeColor(type)}
          />
          <ThemedText variant="caption" semantic="muted">
            ~{durationMinutes} min
          </ThemedText>
        </View>
      </View>

      <ThemedText variant="body" numberOfLines={2}>
        {title}
      </ThemedText>

      <ThemedButton
        title={isCompleted ? "Review Lesson" : "Take Lesson"}
        onPress={onPress}
        variant={isCompleted ? "outlined" : "filled"}
        color="primary"
        size="small"
      />
    </ThemedCard>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    lessonCard: {
      gap: theme.spacing.sm,
    },
    lessonHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    lessonNumber: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,
    },
    lessonMeta: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.xs,
    },
  });