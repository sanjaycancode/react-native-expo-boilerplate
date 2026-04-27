import { StyleSheet, View } from "react-native";

import { Stack } from "expo-router";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

export default function InviteFriendScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <>
      <Stack.Screen options={{ title: "Invite Friends" }} />
      <View style={styles.container}>
        <View>
          <ThemedText variant="heading2">Invite Friends</ThemedText>
          <ThemedText variant="body" semantic="muted">
            Share the app with your friends.
          </ThemedText>
        </View>

        <ThemedCard variant="outlined">
          <ThemedText variant="body">Coming soon</ThemedText>
          <ThemedText variant="bodySmall" semantic="muted">
            Referral links and rewards will appear here.
          </ThemedText>
        </ThemedCard>
      </View>
    </>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: theme.spacing.md,
      gap: theme.spacing.md,
    },
  });
