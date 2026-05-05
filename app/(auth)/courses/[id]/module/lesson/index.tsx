import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import { LessonCard } from "@/components/courses/LessonCard";
import { ThemedCard } from "@/components/ThemedCard";
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

  if (isLoading) {
    return (
      <>
        <Stack.Screen options={{ title: "" }} />
        <View style={styles.container}>
          <ThemedText>Loading...</ThemedText>
        </View>
      </>
    );
  }

  if (error || !data) {
    return (
      <>
        <Stack.Screen options={{ title: "" }} />
        <View style={styles.container}>
          <ThemedCard>
            <ThemedText semantic="error">Failed to load lessons.</ThemedText>
          </ThemedCard>
        </View>
      </>
    );
  }

  const module = data.modules.find((m) => m.id === currentModuleId);

  if (!module) {
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

  const renderLesson = ({ item, index }: { item: (typeof module.lessons)[0]; index: number }) => (
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
      <FlatList
        data={module.lessons}
        keyExtractor={(lesson) => String(lesson.id)}
        renderItem={renderLesson}
        contentContainerStyle={styles.listContent}
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
      padding: theme.spacing.lg,
      gap: theme.spacing.md,
    },
    
  });