import { Pressable, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

import { ManualPracticeSectionData, ManualPracticeTask } from "./data";
import { ManualPracticeTaskCard } from "./ManualPracticeTaskCard";

type ManualPracticeSectionProps = {
  section: ManualPracticeSectionData;
  onViewAll?: (section: ManualPracticeSectionData) => void;
  onPressTask?: (task: ManualPracticeTask) => void;
};

export function ManualPracticeSection({
  section,
  onViewAll,
  onPressTask,
}: ManualPracticeSectionProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <ThemedText variant="button">{section.type}</ThemedText>
        <Pressable onPress={() => onViewAll?.(section)}>
          <ThemedText variant="caption" semantic="primary">
            View All
          </ThemedText>
        </Pressable>
      </View>

      <View style={styles.taskList}>
        {section.tasks.map((task) => (
          <ManualPracticeTaskCard
            key={task.id}
            task={task}
            onPress={onPressTask}
          />
        ))}
      </View>
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    section: {
      gap: theme.spacing.sm,
    },
    sectionHeader: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    taskList: {
      gap: theme.spacing.sm,
    },
  });
