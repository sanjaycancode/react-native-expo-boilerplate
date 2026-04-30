import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { Stack, useLocalSearchParams } from "expo-router";

import { InfoBadge } from "@/components/InfoBadge";
import {
  type ManualPracticeQuestionDifficulty,
  QuestionsFilter,
} from "@/components/manual_practice";
import { StatusBadge } from "@/components/StatusBadge";
import { ThemedCard } from "@/components/ThemedCard";
import { ThemedFlatList } from "@/components/ThemedFlatList";
import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

import { getErrorMessage } from "@/utils";

import { useDebouncedValue } from "@/hooks";
import { useQuestionsInfiniteQuery } from "@/hooks/api";
import type { Question, QuestionSortDir } from "@/types";

type QuestionListParams = {
  section?: string;
  questionTypeCode?: string;
  questionTypeLabel?: string;
};

const QUESTIONS_PAGE_SIZE = 10;

function getQuestionTitle(question: Question) {
  return question.title.trim().length > 0
    ? question.title
    : `Question #${question.id}`;
}

function getDifficultyRange(difficulty: ManualPracticeQuestionDifficulty) {
  switch (difficulty) {
    case "easy":
      return { min: 1, max: 3 };
    case "medium":
      return { min: 4, max: 7 };
    case "hard":
      return { min: 8, max: 10 };
    case "all":
    default:
      return { min: undefined, max: undefined };
  }
}

export default function ManualPracticeQuestionsScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { questionTypeCode, questionTypeLabel } =
    useLocalSearchParams<QuestionListParams>();
  const [search, setSearch] = useState("");
  const [settledSearch, setSettledSearch] = useState("");
  const [difficulty, setDifficulty] =
    useState<ManualPracticeQuestionDifficulty>("all");
  const [sortDir, setSortDir] = useState<QuestionSortDir>("asc");
  const debouncedSearch = useDebouncedValue(search, 300);
  const resolvedQuestionTypeCode =
    typeof questionTypeCode === "string" && questionTypeCode.length > 0
      ? questionTypeCode
      : undefined;
  const difficultyRange = getDifficultyRange(difficulty);
  const questionsQuery = useQuestionsInfiniteQuery({
    questionType: resolvedQuestionTypeCode,
    search: debouncedSearch,
    difficultyMin: difficultyRange.min,
    difficultyMax: difficultyRange.max,
    sortBy: difficulty === "all" ? undefined : "difficulty",
    sortDir: difficulty === "all" ? undefined : sortDir,
    limit: QUESTIONS_PAGE_SIZE,
  });
  const normalizedSearch = debouncedSearch.trim();
  const hasActiveFilters = difficulty !== "all";
  const hasActiveControls = normalizedSearch.length > 0 || hasActiveFilters;
  const isSearchLoading =
    normalizedSearch !== settledSearch &&
    questionsQuery.isFetching &&
    !questionsQuery.isFetchingNextPage;

  useEffect(() => {
    if (!questionsQuery.isFetching) {
      setSettledSearch(normalizedSearch);
    }
  }, [normalizedSearch, questionsQuery.isFetching]);

  const resolvedTitle =
    typeof questionTypeLabel === "string" && questionTypeLabel.length > 0
      ? questionTypeLabel
      : "Questions";
  const questions =
    questionsQuery.data?.pages.flatMap((page) => page.data) ?? [];
  const errorMessage = !resolvedQuestionTypeCode
    ? "Question type is missing."
    : questionsQuery.isError
      ? getErrorMessage(questionsQuery.error)
      : null;

  function handleDifficultyPress(nextDifficulty: ManualPracticeQuestionDifficulty) {
    if (nextDifficulty === "all") {
      setDifficulty("all");
      setSortDir("asc");
      return;
    }

    if (difficulty !== nextDifficulty) {
      setDifficulty(nextDifficulty);
      setSortDir("asc");
      return;
    }

    setSortDir((currentValue) => (currentValue === "asc" ? "desc" : "asc"));
  }

  function renderQuestionItem({ item }: { item: Question }) {
    return (
      <ThemedCard variant="outlined" style={styles.questionCard}>
        <View style={styles.content}>
          <View style={styles.headerRow}>
            <ThemedText variant="body" style={styles.questionTitle}>
              {getQuestionTitle(item)}
            </ThemedText>

            <View style={styles.statusBadges}>
              {item.is_new ? (
                <StatusBadge label="New" variant="primary" />
              ) : null}
              {item.has_done ? (
                <StatusBadge label="Done" variant="neutral" />
              ) : null}
            </View>
          </View>

          <View style={styles.metaRow}>
            <InfoBadge label={`#${item.id}`} tone="default" bordered={false} />
            {item.difficulty ? (
              <InfoBadge
                label={`Difficulty ${item.difficulty}`}
                tone="default"
                bordered={false}
              />
            ) : null}
          </View>
        </View>
      </ThemedCard>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: resolvedTitle,
          headerShown: true,
          headerBackTitle: "Manual Practice",
        }}
      />

      <View style={styles.container}>
        <View style={styles.header}>
          <QuestionsFilter
            search={search}
            onChangeSearch={setSearch}
            onClearSearch={() => setSearch("")}
            isSearchLoading={isSearchLoading}
            difficulty={difficulty}
            sortDir={sortDir}
            onPressDifficulty={handleDifficultyPress}
            onReset={() => {
              setSearch("");
              setDifficulty("all");
              setSortDir("asc");
            }}
            showReset={hasActiveControls}
          />
        </View>

        <ThemedFlatList
          data={questions}
          renderItem={renderQuestionItem}
          keyExtractor={(item) => item.id.toString()}
          isLoading={
            Boolean(resolvedQuestionTypeCode) && questionsQuery.isLoading
          }
          isRefreshing={questionsQuery.isRefetching}
          isLoadingMore={questionsQuery.isFetchingNextPage}
          hasMore={Boolean(questionsQuery.hasNextPage)}
          onRefresh={() => {
            void questionsQuery.refreshFirstPage();
          }}
          onLoadMore={() => {
            if (!questionsQuery.hasNextPage) {
              return;
            }

            void questionsQuery.fetchNextPage();
          }}
          error={errorMessage}
          emptyMessage={
            hasActiveControls
              ? "No questions matched your current filters."
              : "No questions available for this question type yet."
          }
          contentContainerStyle={styles.listContent}
          style={styles.list}
          onEndReachedThreshold={0.3}
        />
      </View>
    </>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    container: {
      flex: 1,
      gap: theme.spacing.md,
      padding: theme.spacing.md,
    },
    header: {
      gap: theme.spacing.sm,
    },
    list: {
      flex: 1,
    },
    listContent: {
      gap: theme.spacing.md,
      paddingBottom: theme.spacing.xl,
    },
    questionCard: {
      padding: theme.spacing.md,
    },
    content: {
      gap: theme.spacing.sm,
    },
    headerRow: {
      alignItems: "flex-start",
      flexDirection: "row",
      gap: theme.spacing.sm,
      justifyContent: "space-between",
    },
    questionTitle: {
      flex: 1,
    },
    statusBadges: {
      alignItems: "flex-end",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: theme.spacing.xs,
      justifyContent: "flex-end",
    },
    metaRow: {
      alignItems: "center",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: theme.spacing.sm,
    },
  });
