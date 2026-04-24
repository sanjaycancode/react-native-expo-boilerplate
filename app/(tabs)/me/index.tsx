import { Pressable, StyleSheet, View } from "react-native";

import { Link, Stack } from "expo-router";

import { ThemedButton } from "@/components/ThemedButton";
import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export default function MeScreen() {
  const { signOut } = useAuth();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <>
      <Stack.Screen options={{ title: "Me" }} />
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
              <ThemedText variant="heading5">Appearance</ThemedText>
              <ThemedText variant="bodySmall" semantic="muted">
                Change app theme and display preferences.
              </ThemedText>
            </ThemedCard>
          </Pressable>
        </Link>
        <ThemedCard variant="outlined">
          <ThemedText variant="heading5">Profile</ThemedText>
          <ThemedText variant="bodySmall" semantic="muted">
            Manage personal details and preferences.
          </ThemedText>
        </ThemedCard>
        <ThemedCard variant="outlined">
          <ThemedText variant="heading5">Notifications</ThemedText>
          <ThemedText variant="bodySmall" semantic="muted">
            Control reminders and app alerts.
          </ThemedText>
        </ThemedCard>

        <ThemedCard variant="outlined">
          <ThemedText variant="heading5">Referrals</ThemedText>
          <ThemedText variant="bodySmall" semantic="muted">
            Invite friends and track rewards.
          </ThemedText>
        </ThemedCard>

        <ThemedButton
          title="Logout"
          variant="danger"
          onPress={signOut}
          style={styles.logoutButton}
        />
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
    logoutButton: {
      marginTop: theme.spacing.sm,
    },
  });
