import { Pressable, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

import { mockTestAttempts } from "./data";
import { MockTestAttemptCard } from "./MockTestAttemptCard";

type RecentAttemptsSectionProps = {
  onViewAll?: () => void;
};

export function RecentAttemptsSection({ onViewAll }: RecentAttemptsSectionProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <ThemedText variant="button">Recent Attempts</ThemedText>
        <Pressable
          onPress={() => onViewAll?.()}
          style={({ pressed }) => [
            styles.viewAllButton,
            pressed && styles.viewAllButtonPressed,
          ]}
        >
          <ThemedText variant="caption" semantic="primary">
            View All
          </ThemedText>
        </Pressable>
      </View>

      <View style={styles.list}>
        {mockTestAttempts.map((attempt) => (
          <MockTestAttemptCard key={attempt.id} attempt={attempt} />
        ))}
      </View>
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    section: {
      gap: theme.spacing.sm,
    },
    header: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    viewAllButton: {
      borderRadius: theme.borderRadius.medium,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
    },
    viewAllButtonPressed: {
      backgroundColor: theme.colors.overlay,
      opacity: 0.75,
    },
    list: {
      gap: theme.spacing.sm,
    },
  });
