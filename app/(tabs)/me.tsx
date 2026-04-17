import { Pressable, StyleSheet, View } from "react-native";

import { Link } from "expo-router";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

export default function MeScreen() {
  const styles = createStyles();

  return (
    <View style={styles.container}>
      <View>
        <ThemedText variant="heading2">Me</ThemedText>
        <ThemedText variant="body" semantic="muted">
          Your account and personal updates.
        </ThemedText>
      </View>

      <Link href="/appearance" asChild>
        <Pressable>
          <ThemedCard variant="outlined">
            <ThemedText variant="button">Appearance</ThemedText>
            <ThemedText variant="bodySmall" semantic="muted">
              Change app theme and display preferences.
            </ThemedText>
          </ThemedCard>
        </Pressable>
      </Link>

      <ThemedCard variant="outlined">
        <ThemedText variant="button">Profile</ThemedText>
        <ThemedText variant="bodySmall" semantic="muted">
          Manage personal details and preferences.
        </ThemedText>
      </ThemedCard>

      <ThemedCard variant="outlined">
        <ThemedText variant="button">Notifications</ThemedText>
        <ThemedText variant="bodySmall" semantic="muted">
          Control reminders and app alerts.
        </ThemedText>
      </ThemedCard>

      <ThemedCard variant="outlined">
        <ThemedText variant="button">Referrals</ThemedText>
        <ThemedText variant="bodySmall" semantic="muted">
          Invite friends and track rewards.
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
