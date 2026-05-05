import { type StyleProp, StyleSheet, View, type ViewStyle } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { FilterPill } from "@/components/FilterPill";
import { SearchBar } from "@/components/SearchBar";
import { ThemedCard } from "@/components/ThemedCard";

import { useTheme } from "@/context/ThemeContext";

import type { QuestionSortDir } from "@/types";

import {
  type ManualPracticeQuestionDifficulty,
  manualPracticeQuestionDifficultyOptions,
} from "./types";

type QuestionsFilterProps = {
  search: string;
  onChangeSearch: (value: string) => void;
  onClearSearch: () => void;
  isSearchLoading?: boolean;
  difficulty: ManualPracticeQuestionDifficulty;
  sortDir: QuestionSortDir;
  onPressDifficulty: (difficulty: ManualPracticeQuestionDifficulty) => void;
  onReset: () => void;
  showReset?: boolean;
  style?: StyleProp<ViewStyle>;
};

function getDifficultyLabel(difficulty: ManualPracticeQuestionDifficulty) {
  switch (difficulty) {
    case "easy":
      return "Easy";
    case "medium":
      return "Medium";
    case "hard":
      return "Hard";
    case "all":
    default:
      return "All";
  }
}

function getSortIconName(
  direction: QuestionSortDir,
): "arrow-up-outline" | "arrow-down-outline" {
  return direction === "asc" ? "arrow-up-outline" : "arrow-down-outline";
}

export function QuestionsFilter({
  search,
  onChangeSearch,
  onClearSearch,
  isSearchLoading = false,
  difficulty,
  sortDir,
  onPressDifficulty,
  onReset,
  showReset = false,
  style,
}: QuestionsFilterProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <ThemedCard variant="elevated" style={[styles.card, style]}>
      <SearchBar
        value={search}
        onChangeText={onChangeSearch}
        placeholder="Search questions..."
        onClear={onClearSearch}
        isLoading={isSearchLoading}
        accessibilityLabel="Search questions"
        accessibilityHint="Search by question id or title"
      />

      <View style={styles.quickFiltersRow}>
        {manualPracticeQuestionDifficultyOptions.map((option) => (
          <FilterPill
            key={option}
            label={getDifficultyLabel(option)}
            selected={difficulty === option}
            size="compact"
            trailingIcon={
              option !== "all" && difficulty === option ? (
                <Ionicons
                  name={getSortIconName(sortDir)}
                  size={14}
                  color={theme.colors.textOnPrimary}
                />
              ) : undefined
            }
            onPress={() => onPressDifficulty(option)}
          />
        ))}

        {showReset ? (
          <FilterPill
            label="Reset"
            size="compact"
            trailingIcon={
              <Ionicons
                name="refresh-outline"
                size={16}
                color={theme.colors.textSecondary}
              />
            }
            onPress={onReset}
          />
        ) : null}
      </View>
    </ThemedCard>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    card: {
      gap: theme.spacing.sm,
      borderRadius: theme.borderRadius.xl,
      padding: theme.spacing.md,
    },
    quickFiltersRow: {
      alignItems: "center",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: theme.spacing.sm,
    },
  });
