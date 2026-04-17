import { Pressable, StyleSheet, View } from "react-native";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { useThemeColors, useThemeMode } from "@/context/ThemeContext";

export default function AppearanceScreen() {
  const colors = useThemeColors();
  const { mode, setTheme } = useThemeMode();

  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
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
          variant="outlined"
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
          variant="outlined"
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
    </View>
  );
}

const createStyles = (colors: ReturnType<typeof useThemeColors>) =>
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
