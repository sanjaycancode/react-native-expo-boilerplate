import { StyleSheet, View } from "react-native";

import { IconBadge } from "@/components/IconBadge";
import { StatusBadge, StatusBadgeVariant } from "@/components/StatusBadge";
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

const statusVariantMap = {
  started: "primary",
  completed: "success",
  expired: "neutral",
} as const satisfies Record<MockTestAttemptStatus, StatusBadgeVariant>;

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
      <IconBadge
        name={attempt.iconName}
        size={18}
        badgeSize={40}
        borderRadius={theme.borderRadius.large}
      />

      <View style={styles.copy}>
        <ThemedText variant="bodySmall">{attempt.title}</ThemedText>
        <ThemedText variant="caption" semantic="muted">
          {attempt.date}
        </ThemedText>
      </View>

      <View style={styles.statusColumn}>
        <StatusBadge
          label={statusLabelMap[attempt.status]}
          variant={statusVariantMap[attempt.status]}
        />
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
    copy: {
      flex: 1,
    },
    statusColumn: {
      alignItems: "flex-end",
      gap: 2,
    },
  });
