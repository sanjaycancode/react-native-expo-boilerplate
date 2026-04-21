import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { Stack } from "expo-router";

import { manualPracticeSections } from "@/components/manual_practice/data";
import { ManualPracticeHeaderSection } from "@/components/manual_practice/ManualPracticeHeaderSection";
import { ManualPracticeSection } from "@/components/manual_practice/ManualPracticeSection";
import { ManualPracticeTypeTabs } from "@/components/manual_practice/ManualPracticeTypeTabs";
import { ManualPracticeType } from "@/components/manual_practice/types";

import { useTheme } from "@/context/ThemeContext";

const ALL_TYPES_PREVIEW_LIMIT = 2;

function getVisibleSections(selectedType: ManualPracticeType) {
  if (selectedType === "All types") {
    return manualPracticeSections.map((section) => ({
      ...section,
      tasks: section.tasks.slice(0, ALL_TYPES_PREVIEW_LIMIT),
    }));
  }

  return manualPracticeSections.filter((section) => section.type === selectedType);
}

export default function ManualPracticeScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [selectedType, setSelectedType] =
    useState<ManualPracticeType>("All types");
  const visibleSections = getVisibleSections(selectedType);

  return (
    <>
      <Stack.Screen
        options={{ title: "Manual Practice", headerShown: false }}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ManualPracticeHeaderSection />
        <ManualPracticeTypeTabs
          selectedType={selectedType}
          onSelectType={setSelectedType}
        />

        {visibleSections.map((section) => (
          <ManualPracticeSection
            key={section.type}
            section={section}
            showViewAll={selectedType === "All types"}
            onViewAll={(selectedSection) => setSelectedType(selectedSection.type)}
          />
        ))}
      </ScrollView>
    </>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      gap: theme.spacing.sm,
      paddingBottom: theme.spacing.xs,
      paddingHorizontal: theme.spacing.lg,
      paddingTop: theme.spacing.xs,
    },
  });
