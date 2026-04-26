import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { Stack } from "expo-router";

import { manualPracticeSections } from "@/components/manual_practice/data";
import { ManualPracticeSection } from "@/components/manual_practice/ManualPracticeSection";
import {
  ManualPracticeType,
  manualPracticeTypes,
} from "@/components/manual_practice/types";
import { ThemedMaterialTopTabs } from "@/components/ThemedMaterialTopTabs";

import { useTheme } from "@/context/ThemeContext";

import { useQtypesQuery } from "@/hooks/api";

const ALL_TYPES_PREVIEW_LIMIT = 2;

function getVisibleSections(selectedType: ManualPracticeType) {
  if (selectedType === "All types") {
    return manualPracticeSections.map((section) => ({
      ...section,
      tasks: section.tasks.slice(0, ALL_TYPES_PREVIEW_LIMIT),
    }));
  }

  return manualPracticeSections.filter(
    (section) => section.type === selectedType,
  );
}

function getTypeCount(type: ManualPracticeType) {
  if (type === "All types") {
    return manualPracticeSections.reduce(
      (total, section) => total + section.typeCount,
      0,
    );
  }

  return (
    manualPracticeSections.find((section) => section.type === type)
      ?.typeCount ?? 0
  );
}

export default function ManualPracticeScreen() {
  const { theme } = useTheme();
  const questions = useQtypesQuery();
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
        <ThemedMaterialTopTabs
          tabs={manualPracticeTypes}
          selectedTab={selectedType}
          onSelectTab={setSelectedType}
          getMetaLabel={(type) => String(getTypeCount(type))}
        />

        {visibleSections.map((section) => (
          <ManualPracticeSection
            key={section.type}
            section={section}
            showViewAll={selectedType === "All types"}
            onViewAll={(selectedSection) =>
              setSelectedType(selectedSection.type)
            }
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
      gap: theme.spacing.lg,
      padding: theme.spacing.md,
    },
    debugText: {
      color: theme.colors.text,
      fontSize: 12,
    },
  });
