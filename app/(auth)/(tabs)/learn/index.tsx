import { Pressable, StyleSheet, View } from "react-native";

import { Link, Stack } from "expo-router";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

export default function LearnScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <>
      <Stack.Screen options={{ title: "Learn" }} />
      <View style={styles.container}>
        <View>
          <ThemedText variant="heading2">Learn</ThemedText>
          <ThemedText variant="body" semantic="muted">
            Build your concepts with guided learning.
          </ThemedText>
        </View>

        <Link href="../courses" asChild>
          <Pressable>
            <ThemedCard variant="outlined">
              <ThemedText variant="heading5">Courses</ThemedText>
              <ThemedText variant="bodySmall" semantic="muted">
                Track structured programs and progress.
              </ThemedText>
            </ThemedCard>
          </Pressable>
        </Link>

        <Link href="../classes" asChild>
          <Pressable>
            <ThemedCard variant="outlined">
              <ThemedText variant="heading5">Classes</ThemedText>
              <ThemedText variant="bodySmall" semantic="muted">
                Join live and recorded classroom sessions.
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
