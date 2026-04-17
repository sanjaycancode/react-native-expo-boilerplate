import { StyleSheet, View } from "react-native";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

export default function DashboardScreen() {
  const styles = createStyles();

  return (
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
        <ThemedText variant="button">Resume Algebra Foundations</ThemedText>
      </ThemedCard>

      <ThemedCard variant="outlined">
        <ThemedText variant="caption" semantic="muted">
          Quick actions
        </ThemedText>
        <ThemedText variant="button">
          Start quiz, review notes, or join class
        </ThemedText>
      </ThemedCard>

      <ThemedCard variant="outlined">
        <ThemedText variant="caption" semantic="muted">
          Progress
        </ThemedText>
        <ThemedText variant="button">12 lessons completed this week</ThemedText>
      </ThemedCard>

      <ThemedCard variant="outlined">
        <ThemedText variant="caption" semantic="muted">
          Recommendations
        </ThemedText>
        <ThemedText variant="button">
          Try Smart Practice for weak topics
        </ThemedText>
      </ThemedCard>
    </View>
  );
}

const createStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      gap: 12,
    },
  });
