import { StyleSheet, View } from "react-native";

import { Stack, useLocalSearchParams } from "expo-router";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

type QuestionListParams = {
  section?: string;
  questionTypeCode?: string;
  questionTypeLabel?: string;
};

export default function ManualPracticeQuestionsScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { questionTypeLabel } =
    useLocalSearchParams<QuestionListParams>();

  const resolvedTitle =
    typeof questionTypeLabel === "string" && questionTypeLabel.length > 0
      ? questionTypeLabel
      : "Questions";

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
        <ThemedCard variant="outlined" style={styles.emptyCard}>
          <ThemedText variant="heading6">No questions yet</ThemedText>
          <ThemedText variant="bodySmall" semantic="muted">
            This is a placeholder screen for the selected question type.
          </ThemedText>
        </ThemedCard>
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
    emptyCard: {
      gap: theme.spacing.sm,
      paddingVertical: theme.spacing.xl,
    },
  });
