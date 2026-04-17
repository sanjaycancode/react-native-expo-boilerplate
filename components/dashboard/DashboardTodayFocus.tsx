import { Pressable, StyleSheet, View } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps } from "react";

import type { FocusTaskTone } from "@/components/dashboard/FocusTaskBar";
import { FocusTaskBar } from "@/components/dashboard/FocusTaskBar";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

type FocusTask = {
  id: string;
  title: string;
  meta: string;
  iconName: ComponentProps<typeof Ionicons>["name"];
  tone: FocusTaskTone;
};

type DashboardTodayFocusProps = {
  tasks: readonly FocusTask[];
  smartSessionLabel: string;
};

export function DashboardTodayFocus({
  tasks,
  smartSessionLabel,
}: DashboardTodayFocusProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <ThemedText style={styles.sectionTitle}>Today&apos;s Focus</ThemedText>
        <Pressable accessibilityRole="button" hitSlop={8}>
          <ThemedText style={styles.viewAllText}>View All</ThemedText>
        </Pressable>
      </View>

      <View style={styles.taskList}>
        {tasks.map((task) => (
          <FocusTaskBar
            iconName={task.iconName}
            key={task.id}
            meta={task.meta}
            title={task.title}
            tone={task.tone}
          />
        ))}

        <ThemedButton
          leftIcon={
            <Ionicons
              color={theme.colors.textOnPrimary}
              name="play-circle-outline"
              size={18}
            />
          }
          onPress={() => {}}
          style={styles.smartSessionButton}
          textStyle={styles.smartSessionButtonText}
          title={smartSessionLabel}
        />
      </View>
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) => {
  const colors = theme.colors;

  return StyleSheet.create({
    section: {
      gap: theme.spacing.sm,
    },
    header: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    sectionTitle: {
      color: colors.textSecondary,
      fontFamily: "LexendBold",
      fontSize: 11,
      letterSpacing: 1.6,
      lineHeight: 16,
      textTransform: "uppercase",
    },
    viewAllText: {
      color: colors.primary,
      fontFamily: "LexendSemiBold",
      fontSize: 10,
      lineHeight: 14,
    },
    taskList: {
      gap: theme.spacing.sm,
    },
    smartSessionButton: {
      borderRadius: theme.borderRadius.large,
      minHeight: 52,
    },
    smartSessionButtonText: {
      fontFamily: "LexendBold",
      fontSize: 13,
      lineHeight: 18,
    },
  });
};
