import { StyleSheet, View } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { ProgressTrack } from "@/components/ProgressTrack";
import { ThemedButton } from "@/components/ThemedButton";
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
    <ThemedCard style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.copy}>
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

          <ThemedText variant="button">{task.title}</ThemedText>
        </View>

        <View style={styles.iconBadge}>
          <Ionicons name={task.iconName} size={16} color={colors.primaryDark} />
        </View>
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.metaRow}>
          <Ionicons
            name={task.durationMinutes ? "timer-outline" : "reader-outline"}
            size={14}
            color={colors.textSecondary}
          />
          <ThemedText variant="caption">{getMetaLabel(task)}</ThemedText>
        </View>

        <ThemedButton
          title={task.actionLabel}
          onPress={() => onPress?.(task)}
          variant={task.actionLabel === "Resume" ? "secondary" : "primary"}
          size="small"
          style={styles.actionButton}
        />
      </View>
    </ThemedCard>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) => {
  return StyleSheet.create({
    card: {
      gap: theme.spacing.md,
    },
    cardHeader: {
      alignItems: "flex-start",
      flexDirection: "row",
      gap: theme.spacing.md,
      justifyContent: "space-between",
    },
    copy: {
      flex: 1,
      gap: theme.spacing.xs,
    },
    progressRow: {
      alignItems: "center",
      flexDirection: "row",
      gap: theme.spacing.xs,
    },
    progressTrack: {
      width: 72,
    },
    iconBadge: {
      alignItems: "center",
      backgroundColor: theme.colors.primaryLight,
      borderRadius: theme.borderRadius.large,
      height: 32,
      justifyContent: "center",
      width: 32,
    },
    cardFooter: {
      alignItems: "center",
      flexDirection: "row",
      gap: theme.spacing.md,
      justifyContent: "space-between",
    },
    metaRow: {
      alignItems: "center",
      flexDirection: "row",
      gap: theme.spacing.xs,
    },
    actionButton: {
      minWidth: 84,
    },
  });
};
