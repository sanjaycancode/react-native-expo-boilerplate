import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";

import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import { AboutCard } from "@/components/courses/AboutCard";
import { CourseSectionCard } from "@/components/courses/CourseSectionCard";
import { ProgressTrack } from "@/components/ProgressTrack";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { BorderRadius, Spacing } from "@/constants/Themes";

import { useCourseQuery } from "@/hooks/useCourseApi";

export default function CourseDetail() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const courseId = Number(id);
  const {data, isLoading, error} = useCourseQuery(courseId);
  
  const styles = createStyles();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const router = useRouter();

  if (isLoading) {
  return (
    <View style={styles.container}>
      <ThemedText>Loading...</ThemedText>
    </View>
  );
}

if (error || !data) {
  return (
    <>
      <Stack.Screen options={{ title: "Course not found" }} />
      <View style={styles.container}>
        <ThemedCard>
          <ThemedText>Failed to load course.</ThemedText>
        </ThemedCard>
      </View>
    </>
  );
}

  

  const courseData = data;

  const totalLessons = courseData.modules.reduce(
    (sum, m) => sum + m.lessons.length,
    0
  );
  const completedLessons = courseData.modules.reduce(
    (sum,m ) => sum + m.lessons.filter((l) => l.is_completed).length,
    0
  );
  const progressPercent = courseData.progress;

  const toggleSection = (sectionId: string) => {
    setExpandedSection(
      expandedSection === sectionId ? null : sectionId
    );
  };

  return (
    <>
      <Stack.Screen options={{ title: courseData.title }} />
      <ScrollView style={styles.container}>
        <Image
          source={{ uri: courseData.image }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.content}>
          <ThemedText variant="heading5" semantic="default">
            {courseData.title}
          </ThemedText>
          

          

          <View style={styles.progressSection}>
            <View style={styles.progressLabelRow}>
              <ThemedText variant="caption" semantic="muted">
                Your Progress
              </ThemedText>
              <ThemedText variant="caption" semantic="primary">
                {progressPercent}% Complete
              </ThemedText>
            </View>
            <ProgressTrack
              progress={progressPercent}
              height={8}
            />
          </View>

          <View style={styles.statsRow}>
            <ThemedCard variant="outlined" style={styles.statCard}>
              <ThemedText variant="heading3" semantic="primary">
                {courseData.modules.length}
              </ThemedText>
              <ThemedText variant="caption" semantic="muted">
                Sections
              </ThemedText>
            </ThemedCard>
            <ThemedCard variant="outlined" style={styles.statCard}>
              <ThemedText variant="heading3" semantic="primary">
                {totalLessons}
              </ThemedText>
              <ThemedText variant="caption" semantic="muted">
                Lessons
              </ThemedText>
            </ThemedCard>
            <ThemedCard variant="outlined" style={styles.statCard}>
              <ThemedText variant="heading3" semantic="primary">
                {completedLessons}/{totalLessons}
              </ThemedText>
              <ThemedText variant="caption" semantic="muted">
                Completed
              </ThemedText>
            </ThemedCard>
          </View>

          <AboutCard 
          description={courseData.short_description}
          title="About This Course"
          />

          <ThemedText variant="heading6" semantic="default">
            Curriculum
          </ThemedText>

          {courseData.modules.map((module, index) => (
            <CourseSectionCard
              key={module.id}
              sectionNumber={index + 1}
              title={module.title}
              goal={module.summary}
              lessons={module.lessons}
              isExpanded={expandedSection === String(module.id)}
              onToggle={() => toggleSection(String(module.id))}
            />
          ))}


          <ThemedButton
            title={
              progressPercent === 100
                ? "Review Course"
                : completedLessons === 0
                  ? "Start Course"
                  : "Start Learning"
            }
            onPress={() => router.push(`/courses/${courseId}/module`)}
            size="medium"
          />
        </View>
      </ScrollView>
    </>
  );
}

const createStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      width: "100%",
      height: 200,
    },
    content: {
      padding: Spacing.md,
      gap: Spacing.md,
      paddingBottom: Spacing.xl + Spacing.sm,
    },
    progressSection: {
      gap: Spacing.xs,
    },
    progressLabelRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    statsRow: {
      flexDirection: "row",
      gap: Spacing.sm,
    },
    statCard: {
      flex: 1,
      alignItems: "center",
      gap: Spacing.xs,
      borderRadius: BorderRadius.large,
    },
    
  });