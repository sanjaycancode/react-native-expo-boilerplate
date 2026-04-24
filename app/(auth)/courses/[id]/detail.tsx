import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";

import { Stack, useLocalSearchParams } from "expo-router";

import { AboutCard } from "@/components/courses/AboutCard";
import { CourseSectionCard } from "@/components/courses/CourseSectionCard";
import { ProgressTrack } from "@/components/ProgressTrack";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";
import { BorderRadius, Spacing } from "@/constants/Themes";
import { useThemeColors } from "@/context/ThemeContext";
import { COURSES } from "@/data/courses";

export default function CourseDetail() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const colors = useThemeColors();
  const styles = createStyles();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const courseData = COURSES.find((c) => c.id === id);

  if (!courseData) {
    return (
      <>
        <Stack.Screen options={{ title:"Course Detail" }} />
        <View style={styles.container}>
          <ThemedText variant="body" semantic="muted">
            Course not found.
          </ThemedText>
        </View>
      </>
    );
  }

  const totalLessons = courseData.sections.reduce(
    (sum, s) => sum + s.lessons.length,
    0
  );
  const completedLessons = courseData.sections.reduce(
    (sum, s) => sum + s.lessons.filter((l) => l.completed).length,
    0
  );
  const progressPercent = Math.round(courseData.progress * 100);

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
          <ThemedText variant="body" semantic="muted">
            {courseData.subtitle}
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
                {courseData.sections.length}
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
          description={courseData.description}
          title="About This Course"
          />

          <ThemedText variant="heading6" semantic="default">
            Course Content
          </ThemedText>

          {courseData.sections.map((section) => (
            <CourseSectionCard
              key={section.id}
              title={section.title}
              goal={section.goal}
              lessons={section.lessons}
              isExpanded={expandedSection === section.id}
              onToggle={() => toggleSection(section.id)}
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
            onPress={() => {}}
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