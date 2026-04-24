import { StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

import { smartPracticeHeatmapItems } from "./data";

type SkillHeatmapSectionProps = {
  onViewHistory?: () => void;
};

export function SkillHeatmapSection({
  onViewHistory,
}: SkillHeatmapSectionProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <ThemedText variant="heading6">Skill Heatmap</ThemedText>
        <TouchableOpacity
          onPress={() => onViewHistory?.()}
          style={styles.historyButton}
          activeOpacity={0.75}
        >
          <ThemedText variant="caption" semantic="primary">
            See full history
          </ThemedText>
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {smartPracticeHeatmapItems.map((item) => (
          <ThemedCard key={item.id} style={styles.heatmapCard}>
            <ThemedText variant="caption" semantic="muted">
              {item.label}
            </ThemedText>
            <ThemedText variant="caption">
              {item.progress.toFixed(1)}%
            </ThemedText>
          </ThemedCard>
        ))}
      </View>
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    section: {
      gap: theme.spacing.md,
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
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: theme.spacing.md,
    },
    heatmapCard: {
      flexBasis: "48%",
      flexGrow: 1,
      gap: theme.spacing.xs,
      padding: theme.spacing.sm,
    },
  });
