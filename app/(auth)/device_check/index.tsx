import { StyleSheet, View } from "react-native";

import { Stack } from "expo-router";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

export default function DeviceCheckScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <>
      <Stack.Screen options={{ title: "Device check" }} />
      <View style={styles.container}>
        <View>
          <ThemedText variant="heading2">Device check</ThemedText>
          <ThemedText variant="body" semantic="muted">
            Manage/check your mic and speaker.
          </ThemedText>
        </View>

        <ThemedCard variant="outlined">
          <ThemedText variant="body">Coming soon</ThemedText>
          <ThemedText variant="bodySmall" semantic="muted">
            Speaker and mic checks will appear here.
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
