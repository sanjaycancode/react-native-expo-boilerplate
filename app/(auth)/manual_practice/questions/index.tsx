import { StyleSheet, View } from "react-native";

import { Stack, useLocalSearchParams } from "expo-router";

import { InfoBadge } from "@/components/InfoBadge";
import { StatusBadge } from "@/components/StatusBadge";
import { ThemedCard } from "@/components/ThemedCard";
import { ThemedFlatList } from "@/components/ThemedFlatList";
import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

import { getErrorMessage } from "@/utils";

import { useQuestionsInfiniteQuery } from "@/hooks/api";
import type { Question } from "@/types";

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

export default function ManualPracticeQuestionsScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { questionTypeCode, questionTypeLabel } =
    useLocalSearchParams<QuestionListParams>();
  const resolvedQuestionTypeCode =
    typeof questionTypeCode === "string" && questionTypeCode.length > 0
      ? questionTypeCode
      : undefined;
  const questionsQuery = useQuestionsInfiniteQuery(
    resolvedQuestionTypeCode,
    QUESTIONS_PAGE_SIZE,
  );

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
          emptyMessage="No questions available for this question type yet."
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
      padding: theme.spacing.lg,
    },
    header: {
      gap: theme.spacing.xs,
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
