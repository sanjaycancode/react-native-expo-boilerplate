import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";

import { ThemedText } from "@/components/ThemedText";

import { useTheme, useThemeColors } from "@/context/ThemeContext";

import type { Module } from "@/types/courseDetail";

interface CourseContentSidebarProps {
  modules: Module[];
  currentLessonId: number;
  onLessonSelect: (moduleId: number, lessonId: number) => void;
  onClose: () => void;
}

export function CourseContentSidebar({
  modules,
  currentLessonId,
  onLessonSelect,
  onClose,
}: CourseContentSidebarProps) {
  const { theme } = useTheme();
  const colors = useThemeColors();
  const styles = createStyles(theme);

  return (
    <View style={[styles.overlay]}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={[styles.sidebar, { backgroundColor: colors.backgroundAlt }]}>
        <View style={styles.sidebarHeader}>
          <ThemedText variant="heading6">Course Content</ThemedText>
          <Pressable onPress={onClose} hitSlop={8}>
            <FontAwesome name="times" size={20} color={colors.text} />
          </Pressable>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {modules.map((module) => (
            <View key={module.id} style={styles.moduleSection}>
              <ThemedText variant="bodySmall" semantic="primary" style={styles.moduleTitle}>
                {module.title}
              </ThemedText>

              {module.lessons.map((lesson, index) => {
                const isCurrent = lesson.id === currentLessonId;
                return (
                  <Pressable
                    key={lesson.id}
                    style={[
                      styles.lessonRow,
                      isCurrent && {
                        backgroundColor: colors.primary,
                        borderRadius: theme.borderRadius.medium,
                      },
                    ]}
                    onPress={() => onLessonSelect(module.id, lesson.id)}
                  >
                    <FontAwesome
                      name={lesson.is_completed ? "check-circle" : "circle"}
                      size={14}
                      color={
                        isCurrent
                          ? colors.textOnPrimary
                          : lesson.is_completed
                            ? colors.success
                            : colors.textTertiary
                      }
                    />
                    <ThemedText
                      variant="bodySmall"
                      semantic={isCurrent ? "default" : "muted"}
                      style={[isCurrent && { color: colors.textOnPrimary }]}
                      numberOfLines={1}
                    >
                      {index + 1}. {lesson.title}
                    </ThemedText>
                  </Pressable>
                );
              })}
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      flexDirection: "row",
      zIndex: 100,
    },
    backdrop: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.4)",
    },
    sidebar: {
      width: "75%",
      paddingTop: theme.spacing.lg,
    },
    sidebarHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: theme.spacing.lg,
      marginBottom: theme.spacing.md,
    },
    moduleSection: {
      paddingHorizontal: theme.spacing.lg,
      marginBottom: theme.spacing.md,
      gap: theme.spacing.xs,
    },
    moduleTitle: {
      marginBottom: theme.spacing.xs,
    },
    lessonRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.sm,
    },
  });