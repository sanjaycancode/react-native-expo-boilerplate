import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function ManualPracticeScreen() {
  const styles = createStyles();

  return (
    <ThemedView style={styles.container}>
      <ThemedText variant="heading2">Manual Practice</ThemedText>
      <ThemedText variant="body" semantic="muted">
        Choose topics and difficulty to practice manually.
      </ThemedText>
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
  });
