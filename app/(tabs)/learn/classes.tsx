import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function ClassesScreen() {
  const styles = createStyles();

  return (
    <ThemedView style={styles.container}>
      <ThemedText variant="heading2">Classes</ThemedText>
      <ThemedText variant="body" semantic="muted">
        Access live classes and replays from your mentors.
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
