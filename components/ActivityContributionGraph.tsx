import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

type ActivityData = {
  date: string; // YYYY-MM-DD format, in ascending order
  activityCount: number;
};

type ProcessedWeek = {
  monthStartLabel?: string;
  days: readonly number[];
  isFiller?: boolean;
};

type ActivityContributionGraphProps = {
  title: string;
  data: readonly ActivityData[];
  maxActivityCount?: number; // Optional: customize activity level scaling. Default: auto-detect from data
  primaryColor?: string; // Optional: customize primary activity color. Default: theme.colors.primary
  emptyColor?: string; // Optional: customize empty cell color. Default: theme.colors.border
};

const dayLabels = ["M", "W", "F"];
const ACTIVITY_LEVELS = 5; // Levels 0-4
const CELL_GAP = 3;
const MIN_CELL_SIZE = 10;
const MAX_CELL_SIZE = 22;

function normalizeWeekDays(days: readonly number[]) {
  if (days.length >= 7) {
    return days;
  }

  return [...days, ...Array.from({ length: 7 - days.length }, () => 0)];
}

function createEmptyWeek(): ProcessedWeek {
  return {
    days: Object.freeze(Array.from({ length: 7 }, () => 0)),
    isFiller: true,
  };
}

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

/**
 * Convert activity count to a level (0-4)
 * Uses linear scaling based on max activity count
 */
function getActivityLevel(activityCount: number, maxCount: number): number {
  if (activityCount === 0) return 0;
  if (maxCount === 0) return 0;

  // Scale activity count to 1-4 (0 is reserved for no activity)
  const scaledLevel = Math.ceil(
    (activityCount / maxCount) * (ACTIVITY_LEVELS - 1),
  );
  return Math.min(scaledLevel, ACTIVITY_LEVELS - 1);
}

/**
 * Group activity data into weeks (7-day columns)
 * Assumes data is in ascending order and complete
 */
function groupDataIntoWeeks(data: readonly ActivityData[]): ProcessedWeek[] {
  if (data.length === 0) return [];

  const weeks: ProcessedWeek[] = [];
  let currentWeek: number[] = [];
  let currentWeekStart: Date | null = null;
  let currentWeekMonthStartLabel: string | undefined;

  for (const entry of data) {
    const date = new Date(entry.date);
    const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    // Initialize current week on first entry or when moving to a new week
    if (currentWeekStart === null) {
      // Find Monday of the week containing this date
      const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
      currentWeekStart = new Date(date);
      currentWeekStart.setDate(currentWeekStart.getDate() + daysToMonday);
    }

    const weekStart = new Date(currentWeekStart);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    // If this date is outside the current week, save current week and start a new one
    if (date < weekStart || date > weekEnd) {
      weeks.push({
        monthStartLabel: currentWeekMonthStartLabel,
        days: Object.freeze(normalizeWeekDays(currentWeek)),
      });
      currentWeek = [];
      currentWeekMonthStartLabel = undefined;

      // Find Monday of the new week
      const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
      currentWeekStart = new Date(date);
      currentWeekStart.setDate(currentWeekStart.getDate() + daysToMonday);
    }

    if (!currentWeekMonthStartLabel && date.getDate() === 1) {
      currentWeekMonthStartLabel = date.toLocaleDateString("en-US", {
        month: "short",
      });
    }

    // Add activity level to current week
    // Find position in week (Monday = 0, ..., Sunday = 6)
    const dayPosition = (date.getDay() + 6) % 7; // Convert Sunday=0 to Sunday=6
    while (currentWeek.length <= dayPosition) {
      currentWeek.push(0);
    }
    currentWeek[dayPosition] = entry.activityCount;
  }

  // Add final week
  if (currentWeek.length > 0) {
    weeks.push({
      monthStartLabel: currentWeekMonthStartLabel,
      days: Object.freeze(normalizeWeekDays(currentWeek)),
    });
  }

  return weeks;
}

/**
 * Convert activity counts in weeks to activity levels (0-4)
 */
function convertCountsToLevels(
  weeks: ProcessedWeek[],
  maxCount: number,
): ProcessedWeek[] {
  return weeks.map((week) => ({
    monthStartLabel: week.monthStartLabel,
    isFiller: week.isFiller,
    days: Object.freeze(
      week.days.map((count) => getActivityLevel(count, maxCount)),
    ),
  }));
}

export function ActivityContributionGraph({
  title,
  data,
  maxActivityCount,
  primaryColor,
  emptyColor,
}: ActivityContributionGraphProps) {
  const { theme } = useTheme();
  const colors = theme.colors;
  const styles = createStyles(theme);

  const activityColor = primaryColor ?? colors.primary;
  const cellEmptyColor = emptyColor ?? colors.border;

  // Determine max activity count for scaling
  const max =
    maxActivityCount ?? Math.max(...data.map((d) => d.activityCount), 1);

  // Transform raw data into weeks and convert counts to levels
  const rawWeeks = groupDataIntoWeeks(data);
  const weeks = convertCountsToLevels(rawWeeks, max);
  const [graphWidth, setGraphWidth] = useState(0);

  const visibleWeekCount = useMemo(() => {
    if (!weeks.length || graphWidth <= 0) {
      return weeks.length;
    }

    const maxColumnsThatFit = Math.floor(
      (graphWidth + CELL_GAP) / (MIN_CELL_SIZE + CELL_GAP),
    );

    return Math.max(1, maxColumnsThatFit);
  }, [graphWidth, weeks.length]);

  const visibleWeeks = useMemo(() => {
    const baseWeeks =
      visibleWeekCount >= weeks.length
        ? weeks
        : weeks.slice(weeks.length - visibleWeekCount);

    if (baseWeeks.length >= visibleWeekCount) {
      return baseWeeks;
    }

    const fillerCount = visibleWeekCount - baseWeeks.length;
    return [
      ...baseWeeks,
      ...Array.from({ length: fillerCount }, () => createEmptyWeek()),
    ];
  }, [visibleWeekCount, weeks]);

  const cellSize = useMemo(() => {
    if (!visibleWeeks.length || graphWidth <= 0) {
      return MIN_CELL_SIZE;
    }

    const totalGapWidth = (visibleWeeks.length - 1) * CELL_GAP;
    const availableWidth = Math.max(graphWidth - totalGapWidth, 0);
    const size = availableWidth / visibleWeeks.length;

    return Math.max(MIN_CELL_SIZE, Math.min(MAX_CELL_SIZE, size));
  }, [graphWidth, visibleWeeks.length]);

  const monthFontSize = useMemo(
    () => Math.max(10, Math.min(13, Math.round(cellSize * 0.95))),
    [cellSize],
  );

  const monthLabels = useMemo(
    () =>
      visibleWeeks
        .map((week, index) => ({
          label: week.monthStartLabel,
          index,
        }))
        .filter((item) => Boolean(item.label)),
    [visibleWeeks],
  );

  if (weeks.length === 0) {
    return (
      <ThemedCard style={styles.card}>
        <ThemedText variant="caption" semantic="muted" style={styles.emptyText}>
          No activity data
        </ThemedText>
      </ThemedCard>
    );
  }

  return (
    <ThemedCard style={styles.card}>
      <View style={styles.header}>
        <ThemedText variant="caption" semantic="muted">
          {title}
        </ThemedText>
        <View style={styles.legend}>
          <ThemedText variant="caption" semantic="muted">
            Less
          </ThemedText>
          {[0, 1, 2, 3, 4].map((level) => (
            <View
              key={level}
              style={[
                styles.legendCell,
                {
                  backgroundColor: getActivityColor(
                    level,
                    activityColor,
                    cellEmptyColor,
                  ),
                },
              ]}
            />
          ))}
          <ThemedText variant="caption" semantic="muted">
            More
          </ThemedText>
        </View>
      </View>

      <View style={styles.monthRow}>
        <View style={styles.dayLabelSpacer} />
        <View
          style={styles.monthGrid}
          onLayout={(event) => setGraphWidth(event.nativeEvent.layout.width)}
        >
          {monthLabels.map((item) => (
            <ThemedText
              key={`${item.label}-${item.index}`}
              variant="caption"
              semantic="muted"
              style={[
                styles.monthLabel,
                {
                  left: item.index * (cellSize + CELL_GAP),
                  fontSize: monthFontSize,
                  lineHeight: monthFontSize + 2,
                },
              ]}
              numberOfLines={1}
            >
              {item.label}
            </ThemedText>
          ))}
        </View>
      </View>

      <View style={styles.graphRow}>
        <View style={styles.dayLabels}>
          {dayLabels.map((label) => (
            <ThemedText key={label} variant="caption" semantic="muted">
              {label}
            </ThemedText>
          ))}
        </View>

        <View style={styles.grid}>
          {visibleWeeks.map((week, weekIndex) => (
            <View
              key={weekIndex}
              style={[styles.weekColumn, { width: cellSize }]}
            >
              {week.days.map((level, dayIndex) => (
                <View
                  key={`${weekIndex}-${dayIndex}`}
                  style={[
                    styles.cell,
                    { width: cellSize, height: cellSize },
                    {
                      backgroundColor: getActivityColor(
                        level,
                        activityColor,
                        cellEmptyColor,
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
    emptyText: {
      textAlign: "center",
      paddingVertical: theme.spacing.md,
    },
    monthRow: {
      flexDirection: "row",
      gap: 6,
    },
    dayLabelSpacer: {
      width: 14,
    },
    monthGrid: {
      flex: 1,
      position: "relative",
      minHeight: 16,
    },
    monthLabel: {
      position: "absolute",
      textAlign: "left",
    },
    graphRow: {
      flexDirection: "row",
      gap: 6,
    },
    dayLabels: {
      justifyContent: "space-around",
      width: 14,
    },
    grid: {
      flexDirection: "row",
      gap: CELL_GAP,
      flex: 1,
    },
    weekColumn: {
      flexShrink: 0,
      alignItems: "stretch",
      gap: CELL_GAP,
    },
    cell: {
      borderRadius: 3,
    },
  });
};

export type { ActivityData };

