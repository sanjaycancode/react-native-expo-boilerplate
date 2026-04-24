import { StyleSheet, View } from "react-native";

import { Stack } from "expo-router";

import { ActionCard } from "@/components/ActionCard";
import { ThemedText } from "@/components/ThemedText";

import { useTheme, useThemeColors } from "@/context/ThemeContext";

type AppTheme = ReturnType<typeof useTheme>["theme"];

export default function CoachingScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const colors = useThemeColors();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Coaching" }} />

      <View>
        <ThemedText variant="heading2">Coaching</ThemedText>
        <ThemedText variant="body" semantic="muted">
          Personalized guidance & support from expert coaches.
        </ThemedText>
      </View>

      <ActionCard
        href="../book_coach"
        iconName="search"
        iconBackgroundColor={colors.primaryLight}
        iconColor={colors.primary}
        title="Book Coach"
        description="Browse & book sessions with available coaches."
      />

      <ActionCard
        href="../my_bookings"
        iconName="calendar-check"
        iconBackgroundColor={colors.primaryLight}
        iconColor={colors.primary}
        title="My Bookings"
        description="View & manage your coaching sessions."
      />
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
