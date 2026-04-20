import { StyleSheet, View } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

import { MockTestAttempt, MockTestAttemptStatus } from "./data";

type MockTestAttemptCardProps = {
  attempt: MockTestAttempt;
};

const statusLabelMap = {
  started: "Started",
  completed: "Completed",
  expired: "Expired",
} as const satisfies Record<MockTestAttemptStatus, string>;

function getAttemptDetail(attempt: MockTestAttempt) {
  if (attempt.progress !== undefined) {
    return `${attempt.progress}% Progress`;
  }

  if (attempt.score) {
    return `Score: ${attempt.score}`;
  }

  return "No Score";
}

export function MockTestAttemptCard({ attempt }: MockTestAttemptCardProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <ThemedCard style={styles.card}>
      <View style={styles.iconBadge}>
        <Ionicons
          name={attempt.iconName}
          size={18}
          color={theme.colors.primaryDark}
        />
      </View>

      <View style={styles.copy}>
        <ThemedText variant="bodySmall">{attempt.title}</ThemedText>
        <ThemedText variant="caption" semantic="muted">
          {attempt.date}
        </ThemedText>
      </View>

      <View style={styles.statusColumn}>
        <View style={[styles.statusBadge, styles[attempt.status]]}>
          <ThemedText
            variant="caption"
            style={[styles.statusText, styles[`${attempt.status}Text`]]}
          >
            {statusLabelMap[attempt.status]}
          </ThemedText>
        </View>
        <ThemedText variant="caption" semantic="muted">
          {getAttemptDetail(attempt)}
        </ThemedText>
      </View>
    </ThemedCard>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    card: {
      alignItems: "center",
      flexDirection: "row",
      gap: theme.spacing.sm,
      padding: theme.spacing.sm,
    },
    iconBadge: {
      alignItems: "center",
      backgroundColor: theme.colors.overlay,
      borderRadius: theme.borderRadius.large,
      height: 40,
      justifyContent: "center",
      width: 40,
    },
    copy: {
      flex: 1,
    },
    statusColumn: {
      alignItems: "flex-end",
      gap: 2,
    },
    statusBadge: {
      borderRadius: theme.borderRadius.full,
      paddingHorizontal: theme.spacing.xs,
      paddingVertical: 2,
    },
    started: {
      backgroundColor: theme.colors.primaryLight,
    },
    completed: {
      backgroundColor: "#DCFCE7",
    },
    expired: {
      backgroundColor: theme.colors.overlay,
    },
    statusText: {
      fontFamily: "LexendSemiBold",
      fontSize: 10,
      lineHeight: 12,
    },
    startedText: {
      color: theme.colors.primaryDark,
    },
    completedText: {
      color: theme.colors.success,
    },
    expiredText: {
      color: theme.colors.textSecondary,
    },
  });
