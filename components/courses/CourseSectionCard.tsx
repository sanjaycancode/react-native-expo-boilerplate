import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { BorderRadius, Spacing } from "@/constants/Themes";

import { useThemeColors } from "@/context/ThemeContext";
import type { Lesson } from "@/types/courseDetail";

interface CourseSectionCardProps {
  title: string;
  sectionNumber: number;
  goal: string;
  lessons: Lesson[];
  isExpanded: boolean;
  onToggle: () => void;
}

export function CourseSectionCard({
  title,
  sectionNumber,
  goal,
  lessons,
  isExpanded,
  onToggle,
}: CourseSectionCardProps) {
  const colors = useThemeColors();

  const sectionCompleted = lessons.every((l) => l.is_completed);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video_embed":
        return "play-circle";
      case "text":
        return "book";
      default:
        return "file";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "video_embed":
        return colors.accent;
      case "text":
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
              Section {sectionNumber}: {title}
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
            <View style={styles.iconWrapper}>
              <FontAwesome
                name="bullseye"
                size={14}
                color={colors.primary}
              />
            </View>
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
              <View style={styles.lessonTitleRow}>
                <View style={styles.iconWrapper}>
                  <FontAwesome
                    name={
                      lesson.is_completed
                        ? "check-circle"
                        : "circle"
                    }
                    size={16}
                    color={
                      lesson.is_completed
                        ? colors.success
                        : colors.textTertiary
                    }
                  />
                </View>
                <ThemedText
                  variant="bodySmall"
                  semantic={lesson.is_completed ? "muted" : "default"}
                  numberOfLines={1}
                >
                  {lesson.title}
                </ThemedText>
              </View>
              <View style={styles.lessonMetaRow}>
                <FontAwesome
                  name={getTypeIcon(lesson.type)}
                  size={12}
                  color={getTypeColor(lesson.type)}
                />
                <ThemedText variant="caption" semantic="muted">
                  ~{lesson.duration_minutes} minutes
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
    paddingVertical: Spacing.md,
    paddingRight: Spacing.md,
    borderRadius: BorderRadius.xl,
    alignItems: "flex-start",
  },
  goalText: {
    flex: 1,
    fontStyle: "italic",
  },
  lessonRow: {
    gap: 2,
    paddingVertical: Spacing.xs,
  },
  lessonTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  iconWrapper: {
    width: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  lessonMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginLeft: 22 + Spacing.sm,
  },
});