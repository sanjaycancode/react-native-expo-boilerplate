import { ThemedButton } from "@/components/ThemedButton";
import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/context/ThemeContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ProgressTrack } from "../ProgressTrack";

interface ModuleCardProps {
  moduleNumber: number;
  title: string;
  summary: string;
  totalLessons: number;
  completedLessons: number;
  onPress: () => void;

}

export function ModuleCard({
  moduleNumber,
  title,
  summary,
  totalLessons,
  completedLessons,
  onPress,

}: ModuleCardProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const isComplete = completedLessons === totalLessons && totalLessons > 0;

  return (
    <ThemedCard variant="outlined" style={styles.card}>
      <View style={styles.titleRow}>
        <FontAwesome name="book" size={18} color={theme.colors.primary} />
        <ThemedText
          variant="heading6"
          semantic={isComplete ? "success" : "default"}
        >
          Module {moduleNumber}: {title}
        </ThemedText>
      </View>

      <ThemedText variant="caption" semantic="muted">
        {totalLessons} lessons · {completedLessons}/{totalLessons} completed
      </ThemedText>

      <ThemedText variant="bodySmall" semantic="muted">
        {summary}
      </ThemedText>

      <View style={styles.progressSection}>
        <View style={styles.progressLabelRow}>
          <ThemedText variant="caption" semantic="muted">
            Progress
          </ThemedText>
          <ThemedText variant="caption" semantic="primary">
            {completedLessons} of {totalLessons} completed
          </ThemedText>
        </View>
        <ProgressTrack progress={progressPercent} height={6} />
      </View>

      <ThemedButton
        title={isComplete ? "Review Module" : "Open Module"}
        onPress={onPress}
        variant="filled"
        size="medium"
      />
    </ThemedCard>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    card: {
      gap: theme.spacing.md,
    },
    titleRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,
    },
    progressSection: {
      gap: theme.spacing.xs,
    },
    progressLabelRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });