import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import FontAwesome from "@expo/vector-icons/FontAwesome";

import { CourseContentSidebar } from "@/components/courses/CourseContentSidebar";
import { LessonTextContent } from "@/components/courses/LessonTextContent";
import { LessonVideoPlayer } from "@/components/courses/LessonVideoPlayer";
import { ProgressTrack } from "@/components/ProgressTrack";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";
import { useTheme, useThemeColors } from "@/context/ThemeContext";
import { useCourseQuery } from "@/hooks/useCourseApi";

export default function TakeLessonScreen() {
  const { id, moduleId, lessonId } = useLocalSearchParams<{
    id?: string;
    moduleId?: string;
    lessonId?: string;
  }>();
  const courseId = Number(id);
  const currentModuleId = Number(moduleId);
  const currentLessonId = Number(lessonId);
  const router = useRouter();
  const { theme } = useTheme();
  const colors = useThemeColors();
  const styles = createStyles(theme);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
            <ThemedText semantic="error">Failed to load lesson.</ThemedText>
          </ThemedCard>
        </View>
      </>
    );
  }

  const currentModule = data.modules.find((m) => m.id === currentModuleId);
  if (!currentModule) {
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

  const currentLessonIndex = currentModule.lessons.findIndex(
    (l) => l.id === currentLessonId
  );
  const lesson = currentModule.lessons[currentLessonIndex];
  if (!lesson) {
    return (
      <>
        <Stack.Screen options={{ title: "" }} />
        <View style={styles.container}>
          <ThemedCard>
            <ThemedText semantic="error">Lesson not found.</ThemedText>
          </ThemedCard>
        </View>
      </>
    );
  }

  const totalLessons = currentModule.lessons.length;
  const completedLessons = currentModule.lessons.filter(
    (l) => l.is_completed
  ).length;
  const progressPercent =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const isVideo = lesson.type === "video_embed";
  const hasPrev = currentLessonIndex > 0;
  const hasNext = currentLessonIndex < totalLessons - 1;

  const prevLesson = hasPrev ? currentModule.lessons[currentLessonIndex - 1] : null;
  const nextLesson = hasNext ? currentModule.lessons[currentLessonIndex + 1] : null;

  const navigateToLesson = (targetModuleId: number, targetLessonId: number) => {
    router.replace(
      `/courses/${courseId}/module/lesson/takeLesson?moduleId=${targetModuleId}&lessonId=${targetLessonId}`
    );
  };

  const handlePrev = () => {
    if (prevLesson) {
      navigateToLesson(currentModuleId, prevLesson.id);
    }
  };

  const handleNext = () => {
    if (nextLesson) {
      navigateToLesson(currentModuleId, nextLesson.id);
    }
  };

  const handleLessonSelect = (targetModuleId: number, targetLessonId: number) => {
    setSidebarOpen(false);
    navigateToLesson(targetModuleId, targetLessonId);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: lesson.title,
        }}
      />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.topRow}>
              <ThemedText variant="heading6" numberOfLines={1}>
                {lesson.title}
              </ThemedText>
              <Pressable onPress={() => setSidebarOpen(true)} hitSlop={8}>
                <FontAwesome name="bars" size={20} color={colors.text} />
              </Pressable>
            </View>

            {isVideo ? (
              <LessonVideoPlayer videoUrl={lesson.embed_url} durationMinutes={lesson.duration_minutes} />
            ) : (
              <LessonTextContent title={lesson.title} content={lesson.body_text} />
            )}

            <View style={styles.progressSection}>
              <View style={styles.progressLabelRow}>
                <ThemedText variant="caption" semantic="muted">
                  Lesson {currentLessonIndex + 1} of {totalLessons}
                </ThemedText>
                <ThemedText variant="caption" semantic="primary">
                  {progressPercent}%
                </ThemedText>
              </View>
              <ProgressTrack progress={progressPercent} height={6} />
            </View>

            <ThemedText variant="caption" semantic="muted">
              Duration: {lesson.duration_minutes} min
            </ThemedText>

            <ThemedButton
              title={isVideo ? "Mark as Complete" : "Mark as Read"}
              onPress={() => {}}
              variant="filled"
              color="success"
              size="medium"
              fullWidth
            />

            <View style={styles.navRow}>
              <ThemedButton
                title="Previous"
                onPress={handlePrev}
                variant="filled"
                color="primary"
                size="small"
                disabled={!hasPrev}
                startIcon={<FontAwesome name="chevron-left" />}
              />
              <ThemedButton
                title="Next"
                onPress={handleNext}
                variant="filled"
                color="primary"
                size="small"
                disabled={!hasNext}
                endIcon={<FontAwesome name="chevron-right" />}
              />
            </View>
          </View>
        </ScrollView>

        {sidebarOpen && (
          <CourseContentSidebar
            modules={data.modules}
            currentLessonId={currentLessonId}
            onLessonSelect={handleLessonSelect}
            onClose={() => setSidebarOpen(false)}
          />
        )}
      </View>
    </>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      padding: theme.spacing.lg,
      gap: theme.spacing.md,
    },
    topRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    progressSection: {
      gap: theme.spacing.xs,
    },
    progressLabelRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    navRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });