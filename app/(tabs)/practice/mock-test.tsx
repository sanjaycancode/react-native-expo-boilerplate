import { StyleSheet, View } from "react-native";

import { Stack } from "expo-router";

import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

export default function MockTestScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <>
      <Stack.Screen options={{ title: "Mock Test" }} />
      <View style={styles.container}>
        <ThemedText variant="heading2">Mock Test</ThemedText>
        <ThemedText variant="body" semantic="muted">
          Full-length timed practice tests will appear here.
        </ThemedText>
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
