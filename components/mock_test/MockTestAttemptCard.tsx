import { StyleSheet, View } from "react-native";

import { IconBadge } from "@/components/IconBadge";
import { ListItem } from "@/components/ListItem";
import { StatusBadge, StatusBadgeVariant } from "@/components/StatusBadge";
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
    <ListItem
      icon={
        <IconBadge
          name={attempt.iconName}
          size={18}
          badgeSize={36}
          borderRadius={theme.borderRadius.large}
        />
      }
    >
      <View style={styles.content}>
        <View style={styles.row}>
          <ThemedText
            variant="bodySmall"
            style={styles.title}
            numberOfLines={1}
          >
            {attempt.title}
          </ThemedText>
          <StatusBadge
            label={statusLabelMap[attempt.status]}
            variant={statusVariantMap[attempt.status]}
          />
        </View>

        <View style={styles.row}>
          <ThemedText variant="caption" semantic="muted">
            {attempt.date}
          </ThemedText>
          <ThemedText variant="caption" semantic="muted">
            {getAttemptDetail(attempt)}
          </ThemedText>
        </View>
      </View>
    </ListItem>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    content: {
      gap: theme.spacing.sm,
    },
    row: {
      alignItems: "center",
      flexDirection: "row",
      gap: theme.spacing.xs,
      justifyContent: "space-between",
    },
    title: {
      flex: 1,
    },
  });
