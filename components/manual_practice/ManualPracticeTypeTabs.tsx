import { ScrollView, StyleSheet } from "react-native";

import { ThemedButton } from "@/components/ThemedButton";

import { useTheme } from "@/context/ThemeContext";

import { ManualPracticeType, manualPracticeTypes } from "./types";

type ManualPracticeTypeTabsProps = {
  selectedType: ManualPracticeType;
  onSelectType: (type: ManualPracticeType) => void;
};

export function ManualPracticeTypeTabs({
  selectedType,
  onSelectType,
}: ManualPracticeTypeTabsProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.typeFilterRow}
    >
      {manualPracticeTypes.map((type) => {
        const isSelected = selectedType === type;

        return (
          <ThemedButton
            key={type}
            title={type}
            onPress={() => onSelectType(type)}
            variant={isSelected ? "primary" : "secondary"}
            size="small"
            style={styles.typeButton}
          />
        );
      })}
    </ScrollView>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    typeFilterRow: {
      alignItems: "center",
      gap: theme.spacing.sm,
      paddingRight: theme.spacing.md,
      paddingVertical: theme.spacing.xs,
    },
    typeButton: {
      alignSelf: "flex-start",
      minWidth: theme.spacing.xxl * 2,
    },
  });
