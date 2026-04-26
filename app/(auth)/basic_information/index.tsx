import { StyleSheet, View } from "react-native";

import { Stack } from "expo-router";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

export default function BasicInformationScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <>
      <Stack.Screen options={{ title: "Basic information" }} />
      <View style={styles.container}>
        <View>
          <ThemedText variant="heading2">Basic information</ThemedText>
          <ThemedText variant="body" semantic="muted">
            Manage your information.
          </ThemedText>
        </View>

        <ThemedCard variant="outlined">
          <ThemedText variant="body">Coming soon</ThemedText>
          <ThemedText variant="bodySmall" semantic="muted">
            Basic information settings will appear here.
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
      padding: theme.spacing.lg,
      gap: theme.spacing.md,
    },
  });

