import { StyleSheet, View } from "react-native";

import { IconBadge } from "@/components/IconBadge";
import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

import { SmartPracticeReviewItem, smartPracticeReviewItems } from "./data";

function getToneColor(
  item: SmartPracticeReviewItem,
  theme: ReturnType<typeof useTheme>["theme"],
) {
  return item.tone === "danger" ? theme.colors.error : theme.colors.primaryDark;
}

export function HighPriorityReviewSection() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.section}>
      <ThemedText variant="button">High Priority Review</ThemedText>

      <View style={styles.list}>
        {smartPracticeReviewItems.map((item) => {
          const toneColor = getToneColor(item, theme);

          return (
            <ThemedCard key={item.id} style={styles.reviewCard}>
              <IconBadge
                name={item.iconName}
                size={18}
                color={toneColor}
                badgeSize={36}
                backgroundColor={`${toneColor}20`}
              />

              <View style={styles.copy}>
                <ThemedText variant="bodySmall">{item.title}</ThemedText>
                <ThemedText variant="caption" semantic="muted">
                  {item.description}
                </ThemedText>
              </View>

              <View style={styles.errorColumn}>
                <ThemedText variant="bodySmall" semantic="error">
                  {item.errorCount}
                </ThemedText>
                <ThemedText variant="caption" semantic="muted">
                  errors
                </ThemedText>
              </View>
            </ThemedCard>
          );
        })}
      </View>
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    section: {
      gap: theme.spacing.xs,
    },
    list: {
      gap: theme.spacing.xs,
    },
    reviewCard: {
      alignItems: "center",
      flexDirection: "row",
      gap: theme.spacing.sm,
      padding: theme.spacing.sm,
    },
    copy: {
      flex: 1,
    },
    errorColumn: {
      alignItems: "flex-end",
    },
  });
