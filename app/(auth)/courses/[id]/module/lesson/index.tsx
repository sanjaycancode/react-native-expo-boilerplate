import React from "react";
import { StyleSheet, View } from "react-native";

import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import { LessonCard } from "@/components/courses/LessonCard";
import { ThemedCard } from "@/components/ThemedCard";
import { ThemedFlatList } from "@/components/ThemedFlatList";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/context/ThemeContext";
import { useCourseQuery } from "@/hooks/useCourseApi";

export default function LessonListScreen() {
  const { id, moduleId } = useLocalSearchParams<{ id?: string; moduleId?: string }>();
  const courseId = Number(id);
  const currentModuleId = Number(moduleId);
  const router = useRouter();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { data, isLoading, error } = useCourseQuery(courseId);

  const module = data?.modules.find((m) => m.id === currentModuleId);

  if (!isLoading && !error && !module) {
    return (
      <>
        <Stack.Screen options={{ title: "" }} />
        <View style={styles.container}>
          <ThemedCard>
            <ThemedText semantic="error">Module not found.</ThemedText>
          </ThemedCard>
        </View>
      </>
    );
  }

  const renderLesson = ({ item, index }: { item: NonNullable<typeof module>["lessons"][0]; index: number }) => (
    <LessonCard
      lessonNumber={index + 1}
      title={item.title}
      type={item.type}
      durationMinutes={item.duration_minutes}
      isCompleted={item.is_completed}
      onPress={() =>
        router.push(
          `/courses/${courseId}/module/lesson/takeLesson?moduleId=${currentModuleId}&lessonId=${item.id}`
        )
      }
    />
  );

  return (
    <>
      <Stack.Screen options={{ title: "Lessons" }} />
      <ThemedFlatList
        data={module?.lessons ?? []}
        keyExtractor={(lesson) => String(lesson.id)}
        renderItem={renderLesson}
        isLoading={isLoading}
        error={error ? "Failed to load lessons." : null}
        contentContainerStyle={styles.listContent}
        emptyMessage="No lessons in this module."
      />
    </>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    listContent: {
      padding: theme.spacing.md,
      gap: theme.spacing.md,
    },
  });