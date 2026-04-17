import { StyleSheet, View } from "react-native";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";

export default function CoachingScreen() {
  const styles = createStyles();

  return (
    <ThemedView style={styles.container}>
      <View>
        <ThemedText variant="heading2">Coaching</ThemedText>
        <ThemedText variant="body" semantic="muted">
          Manage your mentor and session flow.
        </ThemedText>
      </View>

      <ThemedCard>
        <ThemedText variant="button">Bookings</ThemedText>
        <ThemedText variant="bodySmall" semantic="muted">
          View upcoming and past coaching sessions.
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
  });
