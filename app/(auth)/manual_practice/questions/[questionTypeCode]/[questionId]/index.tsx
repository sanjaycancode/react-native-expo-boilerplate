import { StyleSheet, View } from "react-native";

import { Stack, useLocalSearchParams } from "expo-router";

import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

type QuestionPracticeParams = {
  questionId?: string;
  questionTypeCode?: string;
  questionTypeLabel?: string;
  questionTitle?: string;
};

export default function ManualPracticeQuestionPracticeScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { questionId, questionTypeLabel, questionTitle } =
    useLocalSearchParams<QuestionPracticeParams>();
  const resolvedQuestionTitle =
    typeof questionTitle === "string" && questionTitle.length > 0
      ? questionTitle
      : "Question Practice";
  const resolvedQuestionTypeLabel =
    typeof questionTypeLabel === "string" && questionTypeLabel.length > 0
      ? questionTypeLabel
      : "Questions";
  const resolvedQuestionId =
    typeof questionId === "string" && questionId.length > 0
      ? questionId
      : undefined;

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
              ? `Question #${resolvedQuestionId} is ready for practice content.`
              : "Practice content will be added here."}
          </ThemedText>
        </View>
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
  });
