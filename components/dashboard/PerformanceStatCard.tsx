import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

export type PerformanceTrend = "up" | "down";

export type PerformanceStatCardProps = {
  label: string;
  score: number;
  change: number;
  trend: PerformanceTrend;
};

export function PerformanceStatCard({
  label,
  score,
  change,
  trend,
}: PerformanceStatCardProps) {
  const { theme } = useTheme();
  const colors = theme.colors;
  const styles = createStyles(theme);
  const trendColor = trend === "up" ? colors.success : colors.error;
  const trendIcon = trend === "up" ? "↑" : "↓";

  return (
    <View style={styles.card}>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <View style={styles.scoreRow}>
        <ThemedText style={styles.score}>{score}</ThemedText>
        <ThemedText style={[styles.change, { color: trendColor }]}>
          {trendIcon} {Math.abs(change)}
        </ThemedText>
      </View>
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) => {
  const colors = theme.colors;

  return StyleSheet.create({
    card: {
      backgroundColor: colors.backgroundAlt,
      borderRadius: theme.borderRadius.large,
      flexBasis: "48%",
      flexGrow: 1,
      gap: theme.spacing.xs,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.md,
    },
    label: {
      color: colors.textSecondary,
      fontFamily: "LexendBold",
      fontSize: 9,
      letterSpacing: 1.1,
      lineHeight: 13,
      textTransform: "uppercase",
    },
    scoreRow: {
      alignItems: "flex-end",
      flexDirection: "row",
      gap: theme.spacing.sm,
    },
    score: {
      color: colors.text,
      fontFamily: "LexendBold",
      fontSize: 20,
      lineHeight: 25,
    },
    change: {
      fontFamily: "LexendSemiBold",
      fontSize: 10,
      lineHeight: 17,
    },
  });
};
