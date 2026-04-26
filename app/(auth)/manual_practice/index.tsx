import { useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";

import { Stack } from "expo-router";

import type {
  ManualPracticeSectionData,
  ManualPracticeTask,
} from "@/components/manual_practice/data";
import { ManualPracticeSection } from "@/components/manual_practice/ManualPracticeSection";
import {
  ManualPracticeType,
  manualPracticeTypes,
} from "@/components/manual_practice/types";
import { ThemedCard } from "@/components/ThemedCard";
import { ThemedMaterialTopTabs } from "@/components/ThemedMaterialTopTabs";
import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

import { useQtypesQuery } from "@/hooks/api";
import type { Qtype, QtypesBySection, QtypeSection } from "@/types";

const ALL_TYPES_PREVIEW_LIMIT = 2;

const typeToSectionMap: Record<
  Exclude<ManualPracticeType, "All types">,
  QtypeSection
> = {
  Listening: "listening",
  Reading: "reading",
  Writing: "writing",
  Speaking: "speaking",
};

const sectionIcons: Record<QtypeSection, ManualPracticeTask["iconName"]> = {
  listening: "headset-outline",
  reading: "book-outline",
  writing: "list-outline",
  speaking: "mic-outline",
};

function toDisplayType(
  section: QtypeSection,
): Exclude<ManualPracticeType, "All types"> {
  return (section.charAt(0).toUpperCase() + section.slice(1)) as Exclude<
    ManualPracticeType,
    "All types"
  >;
}

function toManualPracticeTask(
  item: Qtype,
  section: QtypeSection,
): ManualPracticeTask {
  return {
    id: item.code,
    title: item.label,
    questionCount: item.count,
    completedQuestionCount: item.attempted_questions,
    iconName: sectionIcons[section],
    actionLabel: item.attempted_questions > 0 ? "Resume" : "Practice",
  };
}

function toManualPracticeSection(
  section: QtypeSection,
  items: Qtype[],
): ManualPracticeSectionData {
  return {
    type: toDisplayType(section),
    typeCount: items.length,
    description: "",
    tasks: items.map((item) => toManualPracticeTask(item, section)),
  };
}

function getErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "message" in error) {
    const { message } = error as { message?: unknown };
    if (typeof message === "string") {
      return message;
    }
  }

  return "Something went wrong.";
}

function getVisibleSections(
  qtypesBySection: QtypesBySection,
  selectedType: ManualPracticeType,
) {
  if (selectedType === "All types") {
    return manualPracticeTypes
      .filter(
        (type): type is Exclude<ManualPracticeType, "All types"> =>
          type !== "All types",
      )
      .map((type) => {
        const section = typeToSectionMap[type];
        const items = qtypesBySection[section] ?? [];

        return {
          ...toManualPracticeSection(section, items),
          tasks: items
            .slice(0, ALL_TYPES_PREVIEW_LIMIT)
            .map((item) => toManualPracticeTask(item, section)),
        };
      });
  }

  const section = typeToSectionMap[selectedType];
  return [toManualPracticeSection(section, qtypesBySection[section] ?? [])];
}

function getTypeCount(
  qtypesBySection: QtypesBySection,
  type: ManualPracticeType,
) {
  if (type === "All types") {
    return Object.values(qtypesBySection).reduce(
      (total, items) => total + (items?.length ?? 0),
      0,
    );
  }

  return qtypesBySection[typeToSectionMap[type]]?.length ?? 0;
 x;
}

export default function ManualPracticeScreen() {
  const { theme } = useTheme();
  const qtypesQuery = useQtypesQuery();
  const styles = createStyles(theme);
  const [selectedType, setSelectedType] =
    useState<ManualPracticeType>("All types");
  const qtypesBySection = qtypesQuery.data?.data ?? {};
  const visibleSections = getVisibleSections(qtypesBySection, selectedType);

  function renderLoadingState() {
    return (
      <ThemedCard variant="outlined" style={styles.stateCard}>
        <ActivityIndicator color={theme.colors.primary} />
        <ThemedText variant="body">Loading question types...</ThemedText>
      </ThemedCard>
    );
  }

  function renderErrorState() {
    return (
      <ThemedCard variant="outlined" style={styles.stateCard}>
        <ThemedText variant="bodySmall" semantic="error">
          Failed to load question types: {getErrorMessage(qtypesQuery.error)}
        </ThemedText>
      </ThemedCard>
    );
  }

  function renderEmptyState() {
    return (
      <ThemedCard variant="outlined" style={styles.stateCard}>
        <ThemedText variant="body" semantic="muted">
          No question types available.
        </ThemedText>
      </ThemedCard>
    );
  }

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
          getMetaLabel={(type) => String(getTypeCount(qtypesBySection, type))}
        />

        {qtypesQuery.isLoading
          ? renderLoadingState()
          : qtypesQuery.isError
            ? renderErrorState()
            : visibleSections.every((section) => section.tasks.length === 0)
              ? renderEmptyState()
              : visibleSections.map((section) => (
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
    header: {
      gap: theme.spacing.xs,
    },
    stateCard: {
      alignItems: "center",
      gap: theme.spacing.md,
      paddingVertical: theme.spacing.xl,
    },
  });
