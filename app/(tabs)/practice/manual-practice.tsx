import { StyleSheet, View } from "react-native";

import { Stack } from "expo-router";

import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

export default function ManualPracticeScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <>
      <Stack.Screen options={{ title: "Manual Practice" }} />
      <View style={styles.container}>
        <ThemedText variant="heading2">Manual Practice</ThemedText>
        <ThemedText variant="body" semantic="muted">
          Choose topics and difficulty to practice manually.
        </ThemedText>
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
