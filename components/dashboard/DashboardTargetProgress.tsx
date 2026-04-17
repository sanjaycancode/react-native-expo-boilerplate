import { StyleSheet, View } from "react-native";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

type DashboardTargetProgressProps = {
  currentScore: number;
  targetScore: number;
  examDate: string;
};

function getProgress(currentScore: number, targetScore: number) {
  if (targetScore <= 0) {
    return 0;
  }

  return Math.min(Math.round((currentScore / targetScore) * 100), 100);
}

function getProgressRingStyle(
  progress: number,
  activeColor: string,
  trackColor: string,
) {
  return {
    borderBottomColor: progress >= 63 ? activeColor : trackColor,
    borderLeftColor: progress >= 88 ? activeColor : trackColor,
    borderRightColor: progress >= 38 ? activeColor : trackColor,
    borderTopColor: progress >= 12 ? activeColor : trackColor,
  };
}

export function DashboardTargetProgress({
  currentScore,
  targetScore,
  examDate,
}: DashboardTargetProgressProps) {
  const { theme } = useTheme();
  const colors = theme.colors;
  const styles = createStyles(theme);
  const progress = getProgress(currentScore, targetScore);
  const remainingScore = Math.max(targetScore - currentScore, 0);

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <ThemedText style={styles.sectionTitle}>Target Progress</ThemedText>
        <ThemedText style={styles.examDate}>Exam Date: {examDate}</ThemedText>
      </View>

      <ThemedCard style={styles.card}>
        <View style={styles.scoreRow}>
          <View>
            <View style={styles.scoreLine}>
              <ThemedText style={styles.currentScore}>{currentScore}</ThemedText>
              <ThemedText style={styles.targetScore}>/ {targetScore}</ThemedText>
            </View>
            <ThemedText style={styles.scoreLabel}>Current PTE score</ThemedText>
          </View>

          <View
            style={[
              styles.progressBadge,
              getProgressRingStyle(
                progress,
                colors.primary,
                colors.primaryLight,
              ),
            ]}
          >
            <ThemedText style={styles.progressText}>{progress}%</ThemedText>
          </View>
        </View>

        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              {
                backgroundColor: colors.accent,
                width: `${progress}%`,
              },
            ]}
          />
        </View>

        <ThemedText style={styles.helperText}>
          {remainingScore} score points away from your PTE target.
        </ThemedText>
      </ThemedCard>
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) => {
  const colors = theme.colors;

  return StyleSheet.create({
    section: {
      gap: theme.spacing.sm,
    },
    header: {
      alignItems: "flex-end",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    sectionTitle: {
      color: colors.textSecondary,
      fontFamily: "LexendBold",
      fontSize: 11,
      letterSpacing: 1.6,
      lineHeight: 16,
      textTransform: "uppercase",
    },
    examDate: {
      color: colors.primary,
      fontFamily: "LexendMedium",
      fontSize: 10,
      lineHeight: 14,
    },
    card: {
      gap: theme.spacing.md,
      padding: theme.spacing.md,
    },
    scoreRow: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    scoreLine: {
      alignItems: "flex-end",
      flexDirection: "row",
      gap: theme.spacing.xs,
    },
    currentScore: {
      color: colors.primary,
      fontFamily: "LexendBold",
      fontSize: 28,
      lineHeight: 34,
    },
    targetScore: {
      color: colors.textSecondary,
      fontFamily: "LexendMedium",
      fontSize: 14,
      lineHeight: 22,
    },
    scoreLabel: {
      color: colors.textSecondary,
      fontFamily: "Lexend",
      fontSize: 10,
      lineHeight: 14,
    },
    progressBadge: {
      alignItems: "center",
      borderRadius: theme.borderRadius.full,
      borderWidth: 3,
      height: 48,
      justifyContent: "center",
      width: 48,
    },
    progressText: {
      color: colors.primary,
      fontFamily: "LexendBold",
      fontSize: 10,
      lineHeight: 14,
    },
    progressTrack: {
      backgroundColor: colors.overlay,
      borderRadius: theme.borderRadius.full,
      height: 6,
      overflow: "hidden",
    },
    progressFill: {
      borderRadius: theme.borderRadius.full,
      height: "100%",
    },
    helperText: {
      color: colors.textSecondary,
      fontFamily: "LexendMedium",
      fontSize: 11,
      lineHeight: 16,
      textAlign: "center",
    },
  });
};
