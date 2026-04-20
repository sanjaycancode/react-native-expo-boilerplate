import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

export function ManualPracticeHeaderSection() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.headerSection}>
      <ThemedText variant="caption" semantic="muted">
        MANUAL MODE
      </ThemedText>
      <ThemedText variant="heading2">Practice</ThemedText>
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    headerSection: {
      gap: theme.spacing.xs,
    },
  });
