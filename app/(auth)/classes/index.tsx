import { StyleSheet, View } from "react-native";

import { Stack } from "expo-router";

import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

export default function ClassesScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Classes",
          headerShown: false,
        }}
      />
      <View style={styles.container}>
        <ThemedText variant="heading2">Classes</ThemedText>
        <ThemedText variant="body" semantic="muted">
          Access live classes and replays from your mentors.
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
