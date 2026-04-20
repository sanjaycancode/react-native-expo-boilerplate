import { StyleSheet, View } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { ProgressTrack } from "@/components/ProgressTrack";
import { ThemedButton } from "@/components/ThemedButton";
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

  return `${task.questionCount} questions`;
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
    <View style={styles.card}>
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
                {progress}% done
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
          variant={task.actionLabel === "Practice" ? "primary" : "secondary"}
          size="small"
          style={
            task.actionLabel === "Resume"
              ? styles.resumeButton
              : styles.actionButton
          }
          textStyle={styles.actionButtonText}
        />
      </View>
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) => {
  const colors = theme.colors;

  return StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      borderRadius: theme.borderRadius.medium,
      gap: theme.spacing.md,
      padding: theme.spacing.md,
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
      backgroundColor: colors.primaryLight,
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
      borderRadius: theme.borderRadius.large,
      minWidth: 84,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.xs,
    },
    resumeButton: {
      backgroundColor: colors.overlay,
      borderRadius: theme.borderRadius.large,
      minWidth: 84,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.xs,
    },
    actionButtonText: {
      fontFamily: "LexendSemiBold",
      fontSize: 12,
      lineHeight: 16,
    },
  });
};
