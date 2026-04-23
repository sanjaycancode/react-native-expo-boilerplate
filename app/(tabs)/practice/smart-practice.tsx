import { StyleSheet, View } from "react-native";

import { Stack } from "expo-router";

import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

export default function SmartPracticeScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <>
      <Stack.Screen options={{ title: "Smart Practice" }} />
      <View style={styles.container}>
        <ThemedText variant="heading2">Smart Practice</ThemedText>
        <ThemedText variant="body" semantic="muted">
          Adaptive practice based on your weakest concepts.
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
