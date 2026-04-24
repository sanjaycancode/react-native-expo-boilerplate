import { Pressable, StyleSheet, View } from "react-native";

import { Link, Stack } from "expo-router";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

export default function PracticeScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <>
      <Stack.Screen options={{ title: "Practice" }} />
      <View style={styles.container}>
        <View>
          <ThemedText variant="heading2">Practice</ThemedText>
          <ThemedText variant="body" semantic="muted">
            Sharpen your skills with targeted practice modes.
          </ThemedText>
        </View>

        <Link href="../mock_test" asChild>
          <Pressable>
            <ThemedCard variant="outlined">
              <ThemedText variant="heading5">Mock Test</ThemedText>
              <ThemedText variant="bodySmall" semantic="muted">
                Simulate full exam conditions with timer.
              </ThemedText>
            </ThemedCard>
          </Pressable>
        </Link>

        <Link href="../manual_practice" asChild>
          <Pressable>
            <ThemedCard variant="outlined">
              <ThemedText variant="heading5">Manual Practice</ThemedText>
              <ThemedText variant="bodySmall" semantic="muted">
                Pick topics and practice at your own pace.
              </ThemedText>
            </ThemedCard>
          </Pressable>
        </Link>

        <Link href="../smart_practice" asChild>
          <Pressable>
            <ThemedCard variant="outlined">
              <ThemedText variant="heading5">Smart Practice</ThemedText>
              <ThemedText variant="bodySmall" semantic="muted">
                Adaptive drills based on weak areas.
              </ThemedText>
            </ThemedCard>
          </Pressable>
        </Link>
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
  });
