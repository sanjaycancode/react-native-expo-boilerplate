import { useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from "react-native";

import { Stack, useRouter } from "expo-router";

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

import { useQuestionTypesQuery } from "@/hooks/api";
import type {
  QuestionSection,
  QuestionType,
  QuestionTypesBySection,
} from "@/types";

const ALL_TYPES_PREVIEW_LIMIT = 2;

const typeToSectionMap: Record<
  Exclude<ManualPracticeType, "All">,
  QuestionSection
> = {
  Listening: "listening",
  Reading: "reading",
  Writing: "writing",
  Speaking: "speaking",
};

const sectionIcons: Record<QuestionSection, ManualPracticeTask["iconName"]> = {
  listening: "headset-outline",
  reading: "book-outline",
  writing: "list-outline",
  speaking: "mic-outline",
};

function toDisplayType(
  section: QuestionSection,
): Exclude<ManualPracticeType, "All"> {
  return (section.charAt(0).toUpperCase() + section.slice(1)) as Exclude<
    ManualPracticeType,
    "All"
  >;
}

function toManualPracticeTask(
  item: QuestionType,
  section: QuestionSection,
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
  section: QuestionSection,
  items: QuestionType[],
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
  questionTypesBySection: QuestionTypesBySection,
  selectedType: ManualPracticeType,
) {
  if (selectedType === "All") {
    return manualPracticeTypes
      .filter(
        (type): type is Exclude<ManualPracticeType, "All"> => type !== "All",
      )
      .map((type) => {
        const section = typeToSectionMap[type];
        const items = questionTypesBySection[section] ?? [];

        return {
          ...toManualPracticeSection(section, items),
          tasks: items
            .slice(0, ALL_TYPES_PREVIEW_LIMIT)
            .map((item) => toManualPracticeTask(item, section)),
        };
      });
  }

  const section = typeToSectionMap[selectedType];
  return [
    toManualPracticeSection(section, questionTypesBySection[section] ?? []),
  ];
}

function getTypeCount(
  questionTypesBySection: QuestionTypesBySection,
  type: ManualPracticeType,
) {
  if (type === "All") {
    return Object.values(questionTypesBySection).reduce(
      (total, items) => total + (items?.length ?? 0),
      0,
    );
  }

  return questionTypesBySection[typeToSectionMap[type]]?.length ?? 0;
}

export default function ManualPracticeScreen() {
  const { theme } = useTheme();
  const questionTypesQuery = useQuestionTypesQuery();
  const styles = createStyles(theme);
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<ManualPracticeType>("All");
  const questionTypesBySection: QuestionTypesBySection =
    questionTypesQuery.data?.data ?? {};
  const visibleSections = getVisibleSections(
    questionTypesBySection,
    selectedType,
  );

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
          Failed to load question types:{" "}
          {getErrorMessage(questionTypesQuery.error)}
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
      <Stack.Screen options={{ title: "Manual Practice", headerShown: true }} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={questionTypesQuery.isRefetching}
            onRefresh={() => {
              void questionTypesQuery.refetch();
            }}
            tintColor={theme.colors.primary}
            colors={[theme.colors.primary]}
          />
        }
      >
        <ThemedMaterialTopTabs
          tabs={manualPracticeTypes}
          selectedTab={selectedType}
          onSelectTab={setSelectedType}
          getMetaLabel={(type) =>
            `(${getTypeCount(questionTypesBySection, type)})`
          }
        />

        {questionTypesQuery.isLoading
          ? renderLoadingState()
          : questionTypesQuery.isError
            ? renderErrorState()
            : visibleSections.every((section) => section.tasks.length === 0)
              ? renderEmptyState()
              : visibleSections.map((section) => (
                  <ManualPracticeSection
                    key={section.type}
                    section={section}
                    showViewAll={selectedType === "All"}
                    onViewAll={(selectedSection) =>
                      setSelectedType(selectedSection.type)
                    }
                    onPressTask={(task) => {
                      router.push({
                        pathname: "/manual_practice/questions",
                        params: {
                          section: section.type,
                          questionTypeCode: task.id,
                          questionTypeLabel: task.title,
                        },
                      });
                    }}
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
      paddingBottom: theme.spacing.xl + 20,
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
