import { StyleSheet, View } from "react-native";

import { Link, Stack } from "expo-router";

import { ThemedButton } from "@/components/ThemedButton";
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
          <ThemedText variant="heading5">Continue session</ThemedText>
          <ThemedText variant="bodySmall" semantic="muted">
            Resume Algebra Foundations
          </ThemedText>
        </ThemedCard>

        <ThemedCard variant="outlined">
          <ThemedText variant="heading5">Quick actions</ThemedText>
          <ThemedText variant="bodySmall" semantic="muted">
            Start quiz, review notes, or join class
          </ThemedText>
        </ThemedCard>

        <ThemedCard variant="outlined">
          <ThemedText variant="heading5">Progress</ThemedText>
          <ThemedText variant="bodySmall" semantic="muted">
            12 lessons completed this week
          </ThemedText>
        </ThemedCard>

        <ThemedCard variant="outlined">
          <ThemedText variant="heading5">Recommendations</ThemedText>
          <ThemedText variant="bodySmall" semantic="muted">
            Try Smart Practice for weak topics
          </ThemedText>
        </ThemedCard>

        <View style={styles.todosActionContainer}>
          <Link href="../todos" asChild>
            <ThemedButton title="Open Todos" onPress={() => {}} />
          </Link>
        </View>
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
    todosActionContainer: {
      marginTop: theme.spacing.sm,
    },
  });
