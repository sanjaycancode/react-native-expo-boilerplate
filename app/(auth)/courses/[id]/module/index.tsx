import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import { ModuleCard } from "@/components/courses/ModuleCard";
import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/context/ThemeContext";
import { useCourseQuery } from "@/hooks/useCourseApi";

export default function CourseModulesScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const courseId = Number(id);
  const router = useRouter();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { data, isLoading, error } = useCourseQuery(courseId);

  if (isLoading) {
    return (
      <>
        <Stack.Screen options={{ title: "Modules" }} />
        <View style={styles.container}>
          <ThemedText>Loading...</ThemedText>
        </View>
      </>
    );
  }

  if (error || !data) {
    return (
      <>
        <Stack.Screen options={{ title: "Error" }} />
        <View style={styles.container}>
          <ThemedCard>
            <ThemedText semantic="error">Failed to load modules.</ThemedText>
          </ThemedCard>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: "Modules" }} />
      <ScrollView style={styles.container}>
       

        <View style={styles.moduleList}>
          {data.modules.map((module, index) => {
            const totalLessons = module.lessons.length;
            const completedLessons = module.lessons.filter(
              (l) => l.is_completed
            ).length;

            return (
              <ModuleCard
                key={module.id}
                moduleNumber={index + 1}
                title={module.title}
                summary={module.summary}
                totalLessons={totalLessons}
                completedLessons={completedLessons}
                onPress={() =>
                  router.push(`/courses/${courseId}/module/lesson`)
                }
              />
            );
          })}
        </View>
      </ScrollView>
    </>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      padding: theme.spacing.lg,
      gap: theme.spacing.xs,
    },
    moduleList: {
      padding: theme.spacing.lg,
      gap: theme.spacing.md,
    },
  });