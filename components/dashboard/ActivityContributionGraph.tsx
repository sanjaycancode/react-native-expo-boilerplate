import { StyleSheet, View } from "react-native";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

type ContributionWeek = {
  month?: string;
  days: readonly number[];
};

type ActivityContributionGraphProps = {
  title: string;
  weeks: readonly ContributionWeek[];
};

const dayLabels = ["M", "W", "F"];

function withOpacity(hexColor: string, opacity: number) {
  const alpha = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0");

  return `${hexColor}${alpha}`;
}

function getActivityColor(
  level: number,
  primaryColor: string,
  emptyColor: string,
) {
  if (level <= 0) {
    return emptyColor;
  }

  return withOpacity(primaryColor, 0.16 + Math.min(level, 4) * 0.18);
}

export function ActivityContributionGraph({
  title,
  weeks,
}: ActivityContributionGraphProps) {
  const { theme } = useTheme();
  const colors = theme.colors;
  const styles = createStyles(theme);

  return (
    <ThemedCard style={styles.card}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>{title}</ThemedText>
        <View style={styles.legend}>
          <ThemedText style={styles.legendText}>Less</ThemedText>
          {[0, 1, 2, 3, 4].map((level) => (
            <View
              key={level}
              style={[
                styles.legendCell,
                {
                  backgroundColor: getActivityColor(
                    level,
                    colors.primary,
                    colors.border,
                  ),
                },
              ]}
            />
          ))}
          <ThemedText style={styles.legendText}>More</ThemedText>
        </View>
      </View>

      <View style={styles.monthRow}>
        <View style={styles.dayLabelSpacer} />
        <View style={styles.monthGrid}>
          {weeks.map((week, index) => (
            <View key={index} style={styles.monthSlot}>
              <ThemedText style={styles.monthLabel}>
                {week.month ?? ""}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.graphRow}>
        <View style={styles.dayLabels}>
          {dayLabels.map((label) => (
            <ThemedText key={label} style={styles.dayLabel}>
              {label}
            </ThemedText>
          ))}
        </View>

        <View style={styles.grid}>
          {weeks.map((week, weekIndex) => (
            <View key={weekIndex} style={styles.weekColumn}>
              {week.days.map((level, dayIndex) => (
                <View
                  key={`${weekIndex}-${dayIndex}`}
                  style={[
                    styles.cell,
                    {
                      backgroundColor: getActivityColor(
                        level,
                        colors.primary,
                        colors.border,
                      ),
                    },
                  ]}
                />
              ))}
            </View>
          ))}
        </View>
      </View>
    </ThemedCard>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) => {
  const colors = theme.colors;

  return StyleSheet.create({
    card: {
      gap: theme.spacing.sm,
      padding: theme.spacing.md,
    },
    header: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    title: {
      color: colors.textSecondary,
      fontFamily: "LexendSemiBold",
      fontSize: 11,
      lineHeight: 16,
    },
    legend: {
      alignItems: "center",
      flexDirection: "row",
      gap: 3,
    },
    legendCell: {
      borderRadius: 3,
      height: 8,
      width: 8,
    },
    legendText: {
      color: colors.textTertiary,
      fontFamily: "Lexend",
      fontSize: 8,
      lineHeight: 12,
    },
    monthRow: {
      flexDirection: "row",
      gap: 6,
    },
    dayLabelSpacer: {
      width: 10,
    },
    monthGrid: {
      flexDirection: "row",
      gap: 3,
    },
    monthSlot: {
      width: 8.5,
    },
    monthLabel: {
      color: colors.textTertiary,
      fontFamily: "Lexend",
      fontSize: 8,
      lineHeight: 12,
      width: 28,
    },
    graphRow: {
      flexDirection: "row",
      gap: 6,
    },
    dayLabels: {
      justifyContent: "space-around",
      width: 10,
    },
    dayLabel: {
      color: colors.textTertiary,
      fontFamily: "Lexend",
      fontSize: 8,
      lineHeight: 10,
    },
    grid: {
      flexDirection: "row",
      gap: 3,
    },
    weekColumn: {
      alignItems: "center",
      gap: 3,
    },
    cell: {
      borderRadius: 3,
      height: 8.5,
      width: 8.5,
    },
  });
};

export type { ContributionWeek };
