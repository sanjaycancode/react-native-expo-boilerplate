import { StyleSheet, View } from "react-native";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function MeScreen() {
  const styles = createStyles();

  return (
    <ThemedView style={styles.container}>
      <View>
        <ThemedText variant="heading2">Me</ThemedText>
        <ThemedText variant="body" semantic="muted">
          Your account and personal updates.
        </ThemedText>
      </View>

      <ThemedCard>
        <ThemedText variant="button">Profile</ThemedText>
        <ThemedText variant="bodySmall" semantic="muted">
          Manage personal details and preferences.
        </ThemedText>
      </ThemedCard>

      <ThemedCard>
        <ThemedText variant="button">Notifications</ThemedText>
        <ThemedText variant="bodySmall" semantic="muted">
          Control reminders and app alerts.
        </ThemedText>
      </ThemedCard>

      <ThemedCard>
        <ThemedText variant="button">Referrals</ThemedText>
        <ThemedText variant="bodySmall" semantic="muted">
          Invite friends and track rewards.
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
