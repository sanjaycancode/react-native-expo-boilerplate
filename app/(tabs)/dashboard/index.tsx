import { StyleSheet, View } from "react-native";

import { Stack } from "expo-router";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

export default function DashboardScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <>
      <Stack.Screen options={{ title: "Dashboard" }} />
      <View style={styles.container}>
        <View>
          <ThemedText variant="heading2">Dashboard</ThemedText>
          <ThemedText variant="body" semantic="muted">
            Track your learning journey at a glance.
          </ThemedText>
        </View>

        <ThemedCard variant="outlined">
          <ThemedText variant="caption" semantic="muted">
            Continue session
          </ThemedText>
          <ThemedText variant="heading5">Resume Algebra Foundations</ThemedText>
        </ThemedCard>

        <ThemedCard variant="outlined">
          <ThemedText variant="caption" semantic="muted">
            Quick actions
          </ThemedText>
          <ThemedText variant="heading5">
            Start quiz, review notes, or join class
          </ThemedText>
        </ThemedCard>

        <ThemedCard variant="outlined">
          <ThemedText variant="caption" semantic="muted">
            Progress
          </ThemedText>
          <ThemedText variant="heading5">
            12 lessons completed this week
          </ThemedText>
        </ThemedCard>

        <ThemedCard variant="outlined">
          <ThemedText variant="caption" semantic="muted">
            Recommendations
          </ThemedText>
          <ThemedText variant="heading5">
            Try Smart Practice for weak topics
          </ThemedText>
        </ThemedCard>
      </View>
    </>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: theme.spacing.lg,
      gap: theme.spacing.md,
    },
  });
