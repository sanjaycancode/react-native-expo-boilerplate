import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function CoursesScreen() {
  const styles = createStyles();

  return (
    <ThemedView style={styles.container}>
      <ThemedText variant="heading2">Courses</ThemedText>
      <ThemedText variant="body" semantic="muted">
        Browse and continue your structured course tracks.
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
