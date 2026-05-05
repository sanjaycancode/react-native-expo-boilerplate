import { ScrollView, StyleSheet, View } from "react-native";

import { Stack, useLocalSearchParams } from "expo-router";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

import { getErrorMessage } from "@/utils";

import { useQuestionDetailQuery } from "@/hooks/api";
import type {
  FlowChartQuestionTypeCode,
  QuestionDetail,
  QuestionDetailFor,
} from "@/types";

type QuestionPracticeParams = {
  questionId?: string;
  questionTypeCode?: string;
  questionTypeLabel?: string;
  questionTitle?: string;
};

function getStringParamValue(value?: string) {
  if (typeof value !== "string") {
    return undefined;
  }

  const normalizedValue = value.trim();
  return normalizedValue.length > 0 ? normalizedValue : undefined;
}

function formatValue(value: number | string | null | undefined) {
  if (value === null || value === undefined || value === "") {
    return "Not provided";
  }

  return String(value);
}

function formatBoolean(value: boolean) {
  return value ? "Yes" : "No";
}

export default function ManualPracticeQuestionPracticeScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { questionId, questionTypeLabel, questionTitle } =
    useLocalSearchParams<QuestionPracticeParams>();
  const resolvedQuestionId = getStringParamValue(questionId);
  const questionDetailQuery = useQuestionDetailQuery(resolvedQuestionId);
  const questionDetail = questionDetailQuery.data?.data;
  const resolvedQuestionTitle =
    questionDetail?.title.trim().length
      ? questionDetail.title
      : getStringParamValue(questionTitle) ?? "Question Practice";
  const resolvedQuestionTypeLabel =
    questionDetail?.question_type.label.trim().length
      ? questionDetail.question_type.label
      : getStringParamValue(questionTypeLabel) ?? "Questions";
  const rawResponse = questionDetailQuery.data
    ? JSON.stringify(questionDetailQuery.data, null, 2)
    : null;

  function renderKeyValueRow(label: string, value: string) {
    return (
      <View style={styles.detailRow}>
        <ThemedText
          variant="bodySmall"
          semantic="muted"
          style={styles.detailLabel}
        >
          {label}
        </ThemedText>
        <ThemedText variant="bodySmall" style={styles.detailValue}>
          {value}
        </ThemedText>
      </View>
    );
  }

  function renderQuestionTypeSpecificContent(detail: QuestionDetail) {
    switch (detail.question_type.code) {
      case "ielts_listening_flow_chart_completion":
      case "ielts_reading_flow_chart_completion": {
        const flowChartDetail =
          detail as QuestionDetailFor<FlowChartQuestionTypeCode>;

        return (
          <ThemedCard>
            <View style={styles.cardContent}>
              <ThemedText variant="heading6">Flowchart</ThemedText>
              {renderKeyValueRow(
                "Blank Count",
                formatValue(flowChartDetail.practice.content.flowchart.blank_count),
              )}
              <View style={styles.stepsList}>
                {flowChartDetail.practice.content.flowchart.steps.map((step) => (
                  <View key={step.step_index} style={styles.stepCard}>
                    <ThemedText variant="bodySmall" semantic="muted">
                      Step {step.step_index}
                    </ThemedText>
                    <ThemedText variant="body">{step.text}</ThemedText>
                    <ThemedText variant="bodySmall" semantic="muted">
                      Blanks:{" "}
                      {step.blanks
                        .map(
                          (blank) =>
                            `#${blank.blank_number} (item ${blank.item_id ?? "n/a"})`,
                        )
                        .join(", ")}
                    </ThemedText>
                  </View>
                ))}
              </View>
            </View>
          </ThemedCard>
        );
      }
      default:
        return null;
    }
  }

  function renderContent() {
    if (!resolvedQuestionId) {
      return (
        <ThemedCard>
          <ThemedText semantic="error">
            Question ID is missing from the route.
          </ThemedText>
        </ThemedCard>
      );
    }

    if (questionDetailQuery.isLoading) {
      return (
        <ThemedCard>
          <ThemedText>Loading question details...</ThemedText>
        </ThemedCard>
      );
    }

    if (questionDetailQuery.isError) {
      return (
        <ThemedCard>
          <ThemedText semantic="error">
            Failed to load question details:{" "}
            {getErrorMessage(questionDetailQuery.error)}
          </ThemedText>
        </ThemedCard>
      );
    }

    if (!questionDetail) {
      return (
        <ThemedCard>
          <ThemedText semantic="muted">
            No question details are available for this question yet.
          </ThemedText>
        </ThemedCard>
      );
    }

    return (
      <ScrollView
        style={styles.contentScrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <ThemedCard>
          <View style={styles.cardContent}>
            <ThemedText variant="heading6">Question Summary</ThemedText>
            {renderKeyValueRow("Question ID", `#${questionDetail.id}`)}
            {renderKeyValueRow(
              "Question Type",
              `${questionDetail.question_type.label} (${questionDetail.question_type.code})`,
            )}
            {renderKeyValueRow("Section", questionDetail.section)}
            {renderKeyValueRow(
              "Difficulty",
              formatValue(questionDetail.difficulty),
            )}
            {renderKeyValueRow(
              "Target Score",
              formatValue(questionDetail.target_score),
            )}
            {renderKeyValueRow("Active", formatBoolean(questionDetail.is_active))}
            {renderKeyValueRow("Completed", formatBoolean(questionDetail.has_done))}
            {renderKeyValueRow("New", formatBoolean(questionDetail.is_new))}
          </View>
        </ThemedCard>

        <ThemedCard>
          <View style={styles.cardContent}>
            <ThemedText variant="heading6">Prompt</ThemedText>
            <ThemedText variant="body">{questionDetail.prompt}</ThemedText>
          </View>
        </ThemedCard>

        <ThemedCard>
          <View style={styles.cardContent}>
            <ThemedText variant="heading6">Practice Instructions</ThemedText>
            {renderKeyValueRow(
              "Preparation Time",
              formatValue(
                questionDetail.practice.instructions.preparation_time,
              ),
            )}
            {renderKeyValueRow(
              "Response Time",
              formatValue(questionDetail.practice.instructions.response_time),
            )}
            {renderKeyValueRow(
              "Word Limit",
              formatValue(questionDetail.practice.instructions.word_limit),
            )}
          </View>
        </ThemedCard>

        {questionDetail.practice.content.passage ? (
          <ThemedCard>
            <View style={styles.cardContent}>
              <ThemedText variant="heading6">Passage</ThemedText>
              <ThemedText variant="body">
                {questionDetail.practice.content.passage}
              </ThemedText>
            </View>
          </ThemedCard>
        ) : null}

        {questionDetail.practice.content.word_bank?.length ? (
          <ThemedCard>
            <View style={styles.cardContent}>
              <ThemedText variant="heading6">Word Bank</ThemedText>
              <View style={styles.wordBankList}>
                {questionDetail.practice.content.word_bank.map((word) => (
                  <View key={word} style={styles.wordChip}>
                    <ThemedText variant="bodySmall">{word}</ThemedText>
                  </View>
                ))}
              </View>
            </View>
          </ThemedCard>
        ) : null}

        {questionDetail.practice.content.text ? (
          <ThemedCard>
            <View style={styles.cardContent}>
              <ThemedText variant="heading6">Practice Text</ThemedText>
              <ThemedText variant="body">
                {questionDetail.practice.content.text}
              </ThemedText>
            </View>
          </ThemedCard>
        ) : null}

        {questionDetail.practice.content.assets?.audio_url ||
        questionDetail.practice.content.assets?.image_url ? (
          <ThemedCard>
            <View style={styles.cardContent}>
              <ThemedText variant="heading6">Assets</ThemedText>
              {questionDetail.practice.content.assets?.audio_url
                ? renderKeyValueRow(
                    "Audio URL",
                    questionDetail.practice.content.assets.audio_url,
                  )
                : null}
              {questionDetail.practice.content.assets?.image_url
                ? renderKeyValueRow(
                    "Image URL",
                    questionDetail.practice.content.assets.image_url,
                  )
                : null}
            </View>
          </ThemedCard>
        ) : null}

        {questionDetail.practice.content.options?.length ? (
          <ThemedCard>
            <View style={styles.cardContent}>
              <ThemedText variant="heading6">Options</ThemedText>
              <View style={styles.optionsList}>
                {questionDetail.practice.content.options.map((option) => (
                  <View key={option.label} style={styles.stepCard}>
                    <ThemedText variant="bodySmall" semantic="muted">
                      {option.label}
                    </ThemedText>
                    <ThemedText variant="body">{option.text}</ThemedText>
                  </View>
                ))}
              </View>
            </View>
          </ThemedCard>
        ) : null}

        {renderQuestionTypeSpecificContent(questionDetail)}

        {rawResponse ? (
          <ThemedCard>
            <View style={styles.cardContent}>
              <ThemedText variant="heading6">Raw Response</ThemedText>
              <ThemedText selectable variant="mono" style={styles.rawResponse}>
                {rawResponse}
              </ThemedText>
            </View>
          </ThemedCard>
        ) : null}
      </ScrollView>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: resolvedQuestionTitle,
          headerShown: true,
          headerBackTitle: resolvedQuestionTypeLabel,
        }}
      />

      <View style={styles.container}>
        <View style={styles.titleSection}>
          <ThemedText variant="heading2">Question Practice</ThemedText>
          <ThemedText variant="body" semantic="muted">
            {resolvedQuestionId
              ? `Question #${resolvedQuestionId} details are loaded below.`
              : "Question details will appear here once a valid question is selected."}
          </ThemedText>
        </View>

        {renderContent()}
      </View>
    </>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: theme.spacing.lg,
      gap: theme.spacing.md,
    },
    titleSection: {
      gap: theme.spacing.xs,
    },
    contentScrollView: {
      flex: 1,
    },
    contentContainer: {
      gap: theme.spacing.md,
      paddingBottom: theme.spacing.xl,
    },
    cardContent: {
      gap: theme.spacing.sm,
    },
    detailRow: {
      alignItems: "flex-start",
      flexDirection: "row",
      gap: theme.spacing.sm,
      justifyContent: "space-between",
    },
    detailLabel: {
      flex: 1,
    },
    detailValue: {
      flex: 1,
      textAlign: "right",
    },
    wordBankList: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: theme.spacing.sm,
    },
    wordChip: {
      backgroundColor: theme.colors.backgroundAlt,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.full,
      borderWidth: 1,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
    },
    stepsList: {
      gap: theme.spacing.sm,
    },
    optionsList: {
      gap: theme.spacing.sm,
    },
    stepCard: {
      backgroundColor: theme.colors.backgroundAlt,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.medium,
      borderWidth: 1,
      gap: theme.spacing.xs,
      padding: theme.spacing.sm,
    },
    rawResponse: {
      lineHeight: 20,
    },
  });
