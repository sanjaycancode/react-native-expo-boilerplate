import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";

import { useThemeColors } from "@/context/ThemeContext";

type ColorKey = "accent" | "primary" | "warning" | "success";

interface SkillProgress {
  label: string;
  score: string;
  progress: number;
  colorKey: ColorKey;
}

const skills: SkillProgress[] = [
  { label: "Listening", score: "7.0", progress: 0.78, colorKey: "accent" },
  { label: "Reading", score: "6.5", progress: 0.72, colorKey: "primary" },
  { label: "Writing", score: "6.0", progress: 0.60, colorKey: "warning" },
  { label: "Speaking", score: "6.5", progress: 0.68, colorKey: "success" },
];

function SkillBar({ skill, colors }: { skill: SkillProgress; colors: Record<string, string> }) {
  const barStyles = useMemo(
    () =>
      StyleSheet.create({
        track: {
          backgroundColor: colors.border,
        },
      }),
    [colors],
  );

  return (
    <View style={styles.skillRow}>
      <View style={styles.skillHeader}>
        <ThemedText variant="bodySmall">{skill.label}</ThemedText>
        <ThemedText variant="bodySmall" semantic="primary">
          {skill.score}
        </ThemedText>
      </View>
      <View style={[styles.track, barStyles.track]}>
        <View
          style={[
            styles.fill,
            {
              width: `${skill.progress * 100}%`,
              backgroundColor: colors[skill.colorKey],
            },
          ]}
        />
      </View>
    </View>
  );
}

export function Progress() {
  const colors = useThemeColors();

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <ThemedText variant="body" style={{ fontWeight: "600" }}>
          Your Progress
        </ThemedText>
        <ThemedText variant="caption" semantic="muted">
          Band Scores
        </ThemedText>
      </View>
      <View style={styles.skillsContainer}>
        {skills.map((skill) => (
          <SkillBar key={skill.label} skill={skill} colors={colors} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 14,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  skillsContainer: {
    gap: 12,
  },
  skillRow: {
    gap: 6,
  },
  skillHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  track: {
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
  },
  fill: {
    height: 6,
    borderRadius: 3,
  },
});
