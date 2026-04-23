import { StyleSheet, View } from "react-native";

import { Stack } from "expo-router";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

export default function CoachingScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <>
      <Stack.Screen options={{ title: "Coaching" }} />
      <View style={styles.container}>
        <View>
          <ThemedText variant="heading2">Coaching</ThemedText>
          <ThemedText variant="body" semantic="muted">
            Manage your mentor and session flow.
          </ThemedText>
        </View>

        <ThemedCard variant="outlined">
          <ThemedText variant="button">Bookings</ThemedText>
          <ThemedText variant="bodySmall" semantic="muted">
            View upcoming and past coaching sessions.
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
