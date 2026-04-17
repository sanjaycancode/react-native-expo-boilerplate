import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColors } from "@/context/ThemeContext";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function DashboardScreen() {
  const colors = useThemeColors();
  const [calendarWidth, setCalendarWidth] = useState(0);
  const styles = useMemo(
    () => createStyles(colors, calendarWidth),
    [calendarWidth, colors],
  );
  const monthLabel = "APRIL";
  const recommendations = useMemo(
    () =>
      [
        {
          title: "Teacher ",
          subtitle: "Focus on weak topics based on your recent results.",
          icon: "bolt",
        },
        {
          title: "Mock Test (Timed)",
          subtitle: "Simulate the real exam with a full-length timed test.",
          icon: "stopwatch",
        },
        {
          title: "Daily Drills",
          subtitle: "Short 10–15 min drills to build consistency.",
          icon: "calendar-check",
        },
      ] as const,
    [],
  );

  const progressCells = useMemo(() => {
    const daysInMonth = 30;
    const startOffset = 1; // 0=Mon ... 6=Sun (visual padding before day 1)
    const totalCells = 35; // 5 weeks x 7 days (calendar-like)

    // deterministic "random" distribution for the first 17 days:
    // 10 success + 7 missed scattered (not sequential)
    const seed =
      monthLabel.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0) +
      daysInMonth +
      startOffset;

    const rand = (() => {
      let state = seed || 1;
      return () => {
        state = (state * 1664525 + 1013904223) % 4294967296;
        return state / 4294967296;
      };
    })();

    const first17 = Array.from({ length: 17 }, (_, i) => i + 1);
    // Fisher–Yates shuffle
    for (let i = first17.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [first17[i], first17[j]] = [first17[j], first17[i]];
    }

    const successDays = new Set(first17.slice(0, 10));
    const missedDays = new Set(first17.slice(10, 17));

    return Array.from({ length: totalCells }, (_, index) => {
      const dayNumber = index - startOffset + 1;
      if (dayNumber < 1 || dayNumber > daysInMonth) {
        return { key: `empty-${index}`, status: "empty" as const };
      }

      if (successDays.has(dayNumber)) {
        return { key: `day-${dayNumber}`, status: "success" as const };
      }

      if (missedDays.has(dayNumber)) {
        return { key: `day-${dayNumber}`, status: "missed" as const };
      }

      return { key: `day-${dayNumber}`, status: "neutral" as const };
    });
  }, []);

  const progressWeeks = useMemo(() => {
    const weeks: (typeof progressCells)[] = [];
    for (let i = 0; i < progressCells.length; i += 7) {
      weeks.push(progressCells.slice(i, i + 7));
    }
    return weeks;
  }, [progressCells]);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <ThemedText variant="heading2">
          <FontAwesome5 name="th-large" size={24} color={colors.text} />{" "}
          Dashboard
        </ThemedText>
        <ThemedText variant="body" semantic="muted">
          Track your progress and stay consistent!
        </ThemedText>
      </View>

      <ThemedCard variant="outlined" style={styles.familyCard}>
        <ThemedText variant="caption" semantic="muted">
          Plan
        </ThemedText>

        <View style={styles.familyGrid}>
          <ThemedCard variant="outlined" style={styles.familyItemCard}>
            <ThemedText variant="caption" semantic="muted">
              Famliy
            </ThemedText>
            <ThemedText variant="heading3">
              IELTS{" "}
              <FontAwesome5
                name="check-circle"
                size={24}
                color={colors.success}
              />{" "}
            </ThemedText>
          </ThemedCard>

          <ThemedCard variant="outlined" style={styles.familyItemCard}>
            <ThemedText variant="caption" semantic="muted">
              Family
            </ThemedText>
            <ThemedText variant="heading3">PTE</ThemedText>
          </ThemedCard>
        </View>
      </ThemedCard>

      <ThemedCard variant="outlined" style={styles.examPlanCard}>
        <ThemedText variant="caption" semantic="muted">
          Exam Plan
        </ThemedText>
        <ThemedText variant="button">Review your Exam Plan</ThemedText>

        <View style={styles.examPlanGrid}>
          <ThemedCard variant="outlined" style={styles.examPlanStatCard}>
            <ThemedText variant="caption" semantic="muted">
              Target Band
            </ThemedText>
            <ThemedText variant="heading3">7.5</ThemedText>
          </ThemedCard>

          <ThemedCard variant="outlined" style={styles.examPlanStatCard}>
            <ThemedText variant="caption" semantic="muted">
              Current Band
            </ThemedText>
            <ThemedText variant="heading3">5.5</ThemedText>
          </ThemedCard>

          <ThemedCard variant="outlined" style={styles.examPlanStatCard}>
            <ThemedText variant="caption" semantic="muted">
              Gap Band
            </ThemedText>
            <ThemedText variant="heading3" style={styles.examPlanGapValue}>
              2.0
            </ThemedText>
          </ThemedCard>

          <ThemedCard variant="outlined" style={styles.examPlanStatCard}>
            <ThemedText variant="caption" semantic="muted">
              Estimate Time
            </ThemedText>
            <ThemedText variant="heading3">3 hours</ThemedText>
          </ThemedCard>
        </View>
        <ThemedText>
          <FontAwesome5 name="pencil-alt" size={17} color={colors.text} />{" "}
          Change Target
        </ThemedText>
      </ThemedCard>

      <ThemedCard variant="outlined" style={styles.progressChartCard}>
        <ThemedText variant="caption" semantic="muted">
          Progress Chart
        </ThemedText>
        <ThemedText variant="button">Activity Streak</ThemedText>

        <View style={styles.calendarHeaderRow}>
          <ThemedText variant="caption" semantic="muted">
            {monthLabel}
          </ThemedText>
        </View>

        <View style={styles.weekHeaderRow}>
          {["M", "T", "W", "T", "F", "S", "S"].map((d, idx) => (
            <ThemedText key={`${d}-${idx}`} variant="caption" semantic="muted">
              {d}
            </ThemedText>
          ))}
        </View>

        <View
          style={styles.calendarGrid}
          onLayout={(e) => setCalendarWidth(e.nativeEvent.layout.width)}
        >
          {progressWeeks.map((week, weekIndex) => (
            <View key={`week-${weekIndex}`} style={styles.calendarWeekRow}>
              {week.map((cell) => (
                <View
                  key={cell.key}
                  style={[
                    styles.calendarCell,
                    cell.status === "empty" && styles.calendarCellEmpty,
                    cell.status === "success" && styles.calendarCellSuccess,
                    cell.status === "missed" && styles.calendarCellMissed,
                  ]}
                />
              ))}
            </View>
          ))}
        </View>

        <View style={styles.calendarLegendRow}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.calendarCellSuccess]} />
            <ThemedText variant="caption" semantic="muted">
              Performed
            </ThemedText>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.calendarCellMissed]} />
            <ThemedText variant="caption" semantic="muted">
              Missed
            </ThemedText>
          </View>
        </View>
      </ThemedCard>

      {/* <ThemedCard variant="outlined">
        <ThemedText variant="caption" semantic="muted">
          Progress
        </ThemedText>
        <ThemedText variant="button">12 lessons completed this week</ThemedText>
      </ThemedCard> */}

      <ThemedCard variant="outlined">
        <ThemedText variant="caption" semantic="muted">
          Recommendations
        </ThemedText>
        <View style={styles.recommendationsList}>
          {recommendations.map((item) => (
            <Pressable
              key={item.title}
              accessibilityRole="button"
              style={({ pressed }) => [
                styles.recommendationRow,
                pressed && styles.rowPressed,
              ]}
            >
              <View style={styles.recommendationLeft}>
                <View style={styles.recommendationIconWrap}>
                  <FontAwesome5
                    name={item.icon}
                    size={14}
                    color={colors.text}
                    solid
                  />
                </View>
                <View style={styles.recommendationText}>
                  <ThemedText variant="button">{item.title}</ThemedText>
                  <ThemedText variant="bodySmall" semantic="muted">
                    {item.subtitle}
                  </ThemedText>
                </View>
              </View>

              <FontAwesome5
                name="chevron-right"
                size={12}
                color={colors.textTertiary}
              />
            </Pressable>
          ))}
        </View>
      </ThemedCard>
    </ScrollView>
  );
}

const createStyles = (
  colors: ReturnType<typeof useThemeColors>,
  calendarWidth: number,
) => {
  const columns = 7;
  const gap = 4;
  const usableWidth = Math.max(0, calendarWidth - gap * (columns - 1));
  const cellSize = Math.max(8, Math.min(10, Math.floor(usableWidth / columns)));

  return StyleSheet.create({
    screen: {
      flex: 1,
    },
    container: {
      padding: 20,
      gap: 12,
    },
    familyCard: {
      gap: 10,
    },
    familyGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
    },
    familyItemCard: {
      flexGrow: 1,
      flexBasis: 150,
      padding: 12,
    },
    examPlanCard: {
      gap: 10,
    },
    examPlanGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
    },
    examPlanStatCard: {
      flexGrow: 1,
      flexBasis: 150,
      padding: 12,
    },
    examPlanGapValue: {
      color: colors.error,
    },
    progressChartCard: {
      gap: 10,
      padding: 12,
    },
    calendarHeaderRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    weekHeaderRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 2,
    },
    calendarGrid: {
      gap,
    },
    calendarWeekRow: {
      flexDirection: "row",
      gap,
      justifyContent: "space-between",
    },
    calendarCell: {
      width: cellSize,
      height: cellSize,
      borderRadius: 2,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.overlay,
    },
    calendarCellEmpty: {
      opacity: 0,
    },
    calendarCellNeutral: {
      backgroundColor: colors.overlay,
    },
    calendarCellSuccess: {
      backgroundColor: colors.success,
      borderColor: colors.success,
    },
    calendarCellMissed: {
      backgroundColor: colors.error,
      borderColor: colors.error,
    },
    calendarLegendRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: 12,
    },
    legendItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    legendDot: {
      width: 10,
      height: 10,
      borderRadius: 2,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.overlay,
    },
    recommendationsList: {
      gap: 10,
      marginTop: 4,
    },
    recommendationRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 12,
      backgroundColor: colors.backgroundAlt,
      gap: 12,
    },
    recommendationLeft: {
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      flex: 1,
    },
    recommendationIconWrap: {
      width: 28,
      height: 28,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.backgroundAlt,
      alignItems: "center",
      justifyContent: "center",
    },
    recommendationText: {
      flex: 1,
      gap: 2,
    },
    rowPressed: {
      opacity: 0.9,
    },
  });
};
