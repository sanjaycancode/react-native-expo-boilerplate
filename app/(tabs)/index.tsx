import { StyleSheet, View } from "react-native";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function DashboardScreen() {
  const styles = createStyles();

  return (
    <ThemedView style={styles.container}>
      <View>
        <ThemedText variant="heading2" style={styles.title}>
          Dashboard
        </ThemedText>
        <ThemedText variant="body" semantic="muted" style={styles.subtitle}>
          Track your learning journey at a glance.
        </ThemedText>
      </View>

      <ThemedCard>
        <ThemedText variant="caption" semantic="muted" style={styles.cardLabel}>
          Continue session
        </ThemedText>
        <ThemedText variant="button" style={styles.cardValue}>
          Resume Algebra Foundations
        </ThemedText>
      </ThemedCard>

      <ThemedCard>
        <ThemedText variant="caption" semantic="muted" style={styles.cardLabel}>
          Quick actions
        </ThemedText>
        <ThemedText variant="button" style={styles.cardValue}>
          Start quiz, review notes, or join class
        </ThemedText>
      </ThemedCard>

      <ThemedCard>
        <ThemedText variant="caption" semantic="muted" style={styles.cardLabel}>
          Progress
        </ThemedText>
        <ThemedText variant="button" style={styles.cardValue}>
          12 lessons completed this week
        </ThemedText>
      </ThemedCard>

      <ThemedCard>
        <ThemedText variant="caption" semantic="muted" style={styles.cardLabel}>
          Recommendations
        </ThemedText>
        <ThemedText variant="button" style={styles.cardValue}>
          Try Smart Practice for weak topics
        </ThemedText>
      </ThemedCard>
    </ThemedView>
  );
}

const createStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      gap: 12,
    },
    title: {
      marginBottom: 2,
    },
    subtitle: {
      marginBottom: 8,
    },
    cardLabel: {
      marginBottom: 4,
    },
    cardValue: {
      fontSize: 17,
    },
  });
