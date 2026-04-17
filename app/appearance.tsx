import { Pressable, StyleSheet, View } from "react-native";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { useThemeColors, useThemeMode } from "@/context/ThemeContext";

export default function AppearanceScreen() {
  const colors = useThemeColors();
  const { mode, setTheme } = useThemeMode();

  const styles = createStyles(colors);

  return (
    <ThemedView style={styles.container}>
      <View>
        <ThemedText variant="heading2">Appearance</ThemedText>
        <ThemedText variant="body" semantic="muted">
          Choose how the app looks for you.
        </ThemedText>
      </View>

      <ThemedText variant="button">Theme Mode</ThemedText>
      <ThemedText variant="bodySmall" semantic="muted">
        Tap a card to apply that theme.
      </ThemedText>

      <Pressable onPress={() => setTheme("light")}>
        <ThemedCard
          style={mode === "light" ? styles.optionCardSelected : undefined}
        >
          <ThemedText
            variant="button"
            semantic={mode === "light" ? "primary" : "default"}
          >
            Light
          </ThemedText>
          <ThemedText variant="bodySmall" semantic="muted">
            Bright background with dark text.
          </ThemedText>
        </ThemedCard>
      </Pressable>

      <Pressable onPress={() => setTheme("dark")}>
        <ThemedCard
          style={mode === "dark" ? styles.optionCardSelected : undefined}
        >
          <ThemedText
            variant="button"
            semantic={mode === "dark" ? "primary" : "default"}
          >
            Dark
          </ThemedText>
          <ThemedText variant="bodySmall" semantic="muted">
            Dark background optimized for low light.
          </ThemedText>
        </ThemedCard>
      </Pressable>
    </ThemedView>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      gap: 12,
    },
    optionCardSelected: {
      backgroundColor: colors.backgroundAlt,
      borderColor: colors.focusRing,
      borderWidth: 2,
    },
  });
