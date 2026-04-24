import { StyleSheet, TouchableOpacity, View } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { IconBadge } from "@/components/IconBadge";
import { ProgressTrack } from "@/components/ProgressTrack";
import { StatusBadge } from "@/components/StatusBadge";
import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

import { ManualPracticeTask } from "./data";

type ManualPracticeTaskCardProps = {
  task: ManualPracticeTask;
  onPress?: (task: ManualPracticeTask) => void;
};

function getProgress(task: ManualPracticeTask) {
  if (task.questionCount === 0) {
    return 0;
  }

  return Math.round((task.completedQuestionCount / task.questionCount) * 100);
}

function getMetaLabel(task: ManualPracticeTask) {
  if (task.durationMinutes) {
    return `${task.durationMinutes} Minutes`;
  }

  return `${task.questionCount} Qs`;
}

function getProgressLabel(task: ManualPracticeTask) {
  return `${task.completedQuestionCount}/${task.questionCount} done`;
}

export function ManualPracticeTaskCard({
  task,
  onPress,
}: ManualPracticeTaskCardProps) {
  const { theme } = useTheme();
  const colors = theme.colors;
  const styles = createStyles(theme);
  const progress = getProgress(task);
  const hasProgress = task.completedQuestionCount > 0;

  return (
    <TouchableOpacity
      activeOpacity={0.86}
      onPress={() => onPress?.(task)}
      disabled={!onPress}
    >
      <ThemedCard style={styles.card}>
        <IconBadge
          name={task.iconName}
          size={16}
          badgeSize={30}
          backgroundColor={colors.background}
          borderRadius={theme.borderRadius.large}
        />

        <View style={styles.content}>
          <View style={styles.headerRow}>
            <ThemedText
              variant="bodySmall"
              style={styles.title}
              numberOfLines={1}
            >
              {task.title}
            </ThemedText>
            <StatusBadge
              label={task.actionLabel}
              variant={task.actionLabel === "Resume" ? "primary" : "neutral"}
            />
          </View>

          {hasProgress ? (
            <View style={styles.progressRow}>
              <ProgressTrack
                progress={progress}
                height={3}
                style={styles.progressTrack}
              />
              <ThemedText variant="caption" semantic="muted">
                {getProgressLabel(task)}
              </ThemedText>
            </View>
          ) : null}

          <View style={styles.metaRow}>
            <Ionicons
              name={task.durationMinutes ? "timer-outline" : "reader-outline"}
              size={14}
              color={colors.textSecondary}
            />
            <ThemedText variant="caption" semantic="muted">
              {getMetaLabel(task)}
            </ThemedText>
          </View>
        </View>
      </ThemedCard>
    </TouchableOpacity>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) => {
  return StyleSheet.create({
    card: {
      alignItems: "flex-start",
      flexDirection: "row",
      gap: theme.spacing.sm,
      padding: theme.spacing.md,
    },
    content: {
      flex: 1,
      gap: theme.spacing.xs,
    },
    headerRow: {
      alignItems: "center",
      flexDirection: "row",
      gap: theme.spacing.sm,
      justifyContent: "space-between",
    },
    title: {
      flex: 1,
    },
    progressRow: {
      alignItems: "center",
      flexDirection: "row",
      gap: theme.spacing.xs,
    },
    progressTrack: {
      width: 72,
    },
    metaRow: {
      alignItems: "center",
      flexDirection: "row",
      gap: theme.spacing.xs,
    },
  });
};
