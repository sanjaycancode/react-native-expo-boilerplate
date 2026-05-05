import { Pressable, StyleSheet, View } from "react-native";

import { Link, Stack } from "expo-router";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

type AppTheme = ReturnType<typeof useTheme>["theme"];

export default function CoachingScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Coaching" }} />

      <View>
        <ThemedText variant="heading2">Coaching</ThemedText>
        <ThemedText variant="body" semantic="muted">
          Personalized guidance & support from expert coaches.
        </ThemedText>
      </View>

      <Link href="../book_coach" asChild>
        <Pressable>
          <ThemedCard variant="outlined">
            <ThemedText variant="heading5">Book Coach</ThemedText>
            <ThemedText variant="bodySmall" semantic="muted">
              Browse & book sessions with available coaches.
            </ThemedText>
          </ThemedCard>
        </Pressable>
      </Link>

      <Link href="../my_bookings" asChild>
        <Pressable>
          <ThemedCard variant="outlined">
            <ThemedText variant="heading5">My Bookings</ThemedText>
            <ThemedText variant="bodySmall" semantic="muted">
              View & manage your coaching sessions.
            </ThemedText>
          </ThemedCard>
        </Pressable>
      </Link>
    </View>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: theme.spacing.lg,
      gap: theme.spacing.md,
    },
  });
