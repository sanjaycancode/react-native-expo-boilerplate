import { StyleSheet, View } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { ProgressTrack } from "@/components/ProgressTrack";
import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

import { smartPracticePacingItems } from "./data";

export function PacingAnalysisCard() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <ThemedCard style={styles.card}>
      <View style={styles.header}>
        <ThemedText variant="button">Pacing Analysis</ThemedText>
        <ThemedText variant="caption" semantic="muted">
          Avg time per response
        </ThemedText>
      </View>

      <View style={styles.list}>
        {smartPracticePacingItems.map((item) => (
          <View key={item.id} style={styles.pacingItem}>
            <View style={styles.row}>
              <Ionicons
                name={item.iconName}
                size={16}
                color={theme.colors.primaryDark}
              />
              <ThemedText variant="caption">{item.title}</ThemedText>
              <ThemedText variant="caption">{item.durationSeconds}s</ThemedText>
            </View>
            <ProgressTrack progress={item.progress} height={4} />
          </View>
        ))}
      </View>
    </ThemedCard>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    card: {
      gap: theme.spacing.sm,
      padding: theme.spacing.md,
    },
    header: {
      gap: theme.spacing.xs,
    },
    list: {
      gap: theme.spacing.sm,
    },
    pacingItem: {
      gap: theme.spacing.xs,
    },
    row: {
      alignItems: "center",
      flexDirection: "row",
      gap: theme.spacing.xs,
      justifyContent: "space-between",
    },
  });
