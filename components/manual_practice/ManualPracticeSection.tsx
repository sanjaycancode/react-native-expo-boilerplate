import { StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

import { ManualPracticeSectionData, ManualPracticeTask } from "./data";
import { ManualPracticeTaskCard } from "./ManualPracticeTaskCard";

type ManualPracticeSectionProps = {
  section: ManualPracticeSectionData;
  showViewAll?: boolean;
  onViewAll?: (section: ManualPracticeSectionData) => void;
  onPressTask?: (task: ManualPracticeTask) => void;
};

export function ManualPracticeSection({
  section,
  showViewAll = false,
  onViewAll,
  onPressTask,
}: ManualPracticeSectionProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitle}>
          <ThemedText variant="bodySmall">{section.type}</ThemedText>
        </View>
        {showViewAll ? (
          <TouchableOpacity
            onPress={() => onViewAll?.(section)}
            style={styles.viewAllButton}
            activeOpacity={0.75}
          >
            <ThemedText variant="caption" semantic="primary">
              View All
            </ThemedText>
          </TouchableOpacity>
        ) : null}
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
      gap: theme.spacing.md,
    },
    sectionHeader: {
      alignItems: "center",
      flexDirection: "row",
      gap: theme.spacing.md,
      justifyContent: "space-between",
    },
    sectionTitle: {
      alignItems: "center",
      flex: 1,
      flexDirection: "row",
      gap: theme.spacing.xs,
    },
    viewAllButton: {
      borderRadius: theme.borderRadius.medium,
      paddingHorizontal: theme.spacing.xs,
      paddingVertical: 2,
    },
    taskList: {
      gap: theme.spacing.md,
    },
  });
