import { StyleSheet, View } from "react-native";

import type { ContributionWeek } from "@/components/dashboard/ActivityContributionGraph";
import { ActivityContributionGraph } from "@/components/dashboard/ActivityContributionGraph";
import type { PerformanceStatCardProps } from "@/components/dashboard/PerformanceStatCard";
import { PerformanceStatCard } from "@/components/dashboard/PerformanceStatCard";
import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

type DashboardPerformanceProps = {
  stats: readonly PerformanceStatCardProps[];
  contributionTitle: string;
  contributionWeeks: readonly ContributionWeek[];
};

export function DashboardPerformance({
  stats,
  contributionTitle,
  contributionWeeks,
}: DashboardPerformanceProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.section}>
      <ThemedText style={styles.sectionTitle}>Performance</ThemedText>

      <View style={styles.statsGrid}>
        {stats.map((stat) => (
          <PerformanceStatCard key={stat.label} {...stat} />
        ))}
      </View>

      <ActivityContributionGraph
        title={contributionTitle}
        weeks={contributionWeeks}
      />
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) => {
  const colors = theme.colors;

  return StyleSheet.create({
    section: {
      gap: theme.spacing.sm,
    },
    sectionTitle: {
      color: colors.textSecondary,
      fontFamily: "LexendBold",
      fontSize: 11,
      letterSpacing: 1.6,
      lineHeight: 16,
      textTransform: "uppercase",
    },
    statsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: theme.spacing.sm,
    },
  });
};
