import React from "react";
import { StyleSheet } from "react-native";

import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import { ModuleCard } from "@/components/courses/ModuleCard";
import { ThemedFlatList } from "@/components/ThemedFlatList";
import { useTheme } from "@/context/ThemeContext";
import { useCourseQuery } from "@/hooks/useCourseApi";
import type { Module } from "@/types/courseDetail";

export default function CourseModulesScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const courseId = Number(id);
  const router = useRouter();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { data, isLoading, error } = useCourseQuery(courseId);

  const renderModule = ({ item, index }: { item: Module; index: number }) => {
    const totalLessons = item.lessons.length;
    const completedLessons = item.lessons.filter(
      (l) => l.is_completed
    ).length;

    return (
      <ModuleCard
        moduleNumber={index + 1}
        title={item.title}
        summary={item.summary}
        totalLessons={totalLessons}
        completedLessons={completedLessons}
        onPress={() =>
          router.push(`/courses/${courseId}/module/lesson?moduleId=${item.id}`)
        }
      />
    );
  };

  return (
    <>
      <Stack.Screen options={{ title: "Modules" }} />
      <ThemedFlatList
        data={data?.modules ?? []}
        keyExtractor={(module) => String(module.id)}
        renderItem={renderModule}
        isLoading={isLoading}
        error={error ? "Failed to load modules." : null}
        contentContainerStyle={styles.listContent}
        emptyMessage="No modules in this course."
      />
    </>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    listContent: {
      padding: theme.spacing.md,
      gap: theme.spacing.md,
    },
  });