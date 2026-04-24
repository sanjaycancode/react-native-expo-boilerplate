
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { BorderRadius, Spacing } from "@/constants/Themes";

import { useThemeColors } from "@/context/ThemeContext";

import { Lesson } from "@/data/courses";

interface CourseSectionCardProps {
  title: string;
  goal: string;
  lessons: Lesson[];
  isExpanded: boolean;
  onToggle: () => void;
}

export function CourseSectionCard({
  title,
  goal,
  lessons,
  isExpanded,
  onToggle,
}: CourseSectionCardProps) {
  const colors = useThemeColors();

  const sectionCompleted = lessons.every((l) => l.completed);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "VIDEO":
        return "play-circle";
      case "READING":
        return "book";
      case "QUIZ":
        return "question-circle";
      default:
        return "file";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "VIDEO":
        return colors.primary;
      case "READING":
        return colors.accent;
      case "QUIZ":
        return colors.warning;
      default:
        return colors.textSecondary;
    }
  };

  return (
    <ThemedCard
      variant="outlined"
      style={[
        styles.sectionCard,
        isExpanded ? { borderColor: colors.primary } : undefined,
      ]}
    >
      <Pressable onPress={onToggle} style={styles.headerRow}>
        <View style={styles.sectionHeader}>
          <View style={styles.titleRow}>
            <ThemedText
              variant="body"
              semantic={isExpanded ? "primary" : "default"}
            >
              {title}
            </ThemedText>
            {sectionCompleted && (
              <FontAwesome
                name="check-circle"
                size={14}
                color={colors.success}
              />
            )}
          </View>
          <ThemedText variant="caption" semantic="muted">
            {lessons.length} lessons
          </ThemedText>
        </View>
        <FontAwesome
          name={isExpanded ? "chevron-up" : "chevron-down"}
          size={14}
          color={isExpanded ? colors.primary : colors.textSecondary}
        />
      </Pressable>

      {isExpanded && (
        <View style={styles.expandedContent}>
          <View
            style={[
              styles.goalBox,
              { backgroundColor: colors.backgroundAlt },
            ]}
          >
            <FontAwesome
              name="bullseye"
              size={14}
              color={colors.primary}
            />
            <ThemedText
              variant="bodySmall"
              semantic="muted"
              style={styles.goalText}
            >
              {goal}
            </ThemedText>
          </View>

          {lessons.map((lesson) => (
            <View key={lesson.id} style={styles.lessonRow}>
              <View style={styles.lessonLeft}>
                <View style={styles.iconWrapper}>
                  <FontAwesome
                    name={
                      lesson.completed
                        ? "check-circle"
                        : getTypeIcon(lesson.type)
                    }
                    size={16}
                    color={
                      lesson.completed
                        ? colors.success
                        : getTypeColor(lesson.type)
                    }
                  />
                </View>
                <ThemedText
                  variant="bodySmall"
                  semantic={lesson.completed ? "muted" : "default"}
                  numberOfLines={1}
                >
                  {lesson.title}
                </ThemedText>
              </View>
              <View style={styles.lessonRight}>
                <View
                  style={[
                    styles.typeBadge,
                    { backgroundColor: getTypeColor(lesson.type) },
                  ]}
                >
                  <ThemedText variant="caption" style={styles.badgeText}>
                    {lesson.type}
                  </ThemedText>
                </View>
                <ThemedText variant="caption" semantic="muted" style={styles.durationText}>
                  {lesson.duration}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
      )}
    </ThemedCard>
  );
}

const styles = StyleSheet.create({
  sectionCard: {
    gap: Spacing.sm,
    borderRadius: BorderRadius.xl,
    flexDirection: "column",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionHeader: {
    flex: 1,
    gap: Spacing.xs,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  
  expandedContent: {
    width: "100%",
    gap: Spacing.sm,
    paddingTop: Spacing.xs,
  },
  goalBox: {
    flexDirection: "row",
    gap: Spacing.sm,
    padding: Spacing.md,
    borderRadius: BorderRadius.xl,
    alignItems: "flex-start",
  },
  goalText: {
    flex: 1,
    fontStyle: "italic",
  },
  lessonRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.xs,
  },
  lessonLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    width: "60%",
  },
  iconWrapper: {
    width: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  lessonRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    width: "40%",
    justifyContent: "flex-end",
  },
  typeBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.small,
    minWidth: 52,
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontFamily: "LexendSemiBold",
  },
  durationText: {
    width: 50,
  },
});