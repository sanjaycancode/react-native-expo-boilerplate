import { Pressable, StyleSheet, View } from "react-native";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

import { smartPracticeHeatmapItems } from "./data";

type SkillHeatmapSectionProps = {
  onViewHistory?: () => void;
};

export function SkillHeatmapSection({ onViewHistory }: SkillHeatmapSectionProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <ThemedText variant="button">Skill Heatmap</ThemedText>
        <Pressable
          onPress={() => onViewHistory?.()}
          style={({ pressed }) => [
            styles.historyButton,
            pressed && styles.historyButtonPressed,
          ]}
        >
          <ThemedText variant="caption" semantic="primary">
            See full history
          </ThemedText>
        </Pressable>
      </View>

      <View style={styles.grid}>
        {smartPracticeHeatmapItems.map((item) => (
          <ThemedCard key={item.id} style={styles.heatmapCard}>
            <ThemedText variant="caption" semantic="muted">
              {item.label}
            </ThemedText>
            <ThemedText variant="button">{item.progress.toFixed(1)}%</ThemedText>
          </ThemedCard>
        ))}
      </View>
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    section: {
      gap: theme.spacing.xs,
    },
    header: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    historyButton: {
      borderRadius: theme.borderRadius.medium,
      paddingHorizontal: theme.spacing.xs,
      paddingVertical: 2,
    },
    historyButtonPressed: {
      backgroundColor: theme.colors.overlay,
      opacity: 0.75,
    },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: theme.spacing.xs,
    },
    heatmapCard: {
      flexBasis: "48%",
      flexGrow: 1,
      gap: theme.spacing.xs,
      padding: theme.spacing.xs,
    },
  });
