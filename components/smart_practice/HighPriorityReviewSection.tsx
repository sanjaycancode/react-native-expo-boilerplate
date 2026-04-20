import { StyleSheet, View } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

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
              <View
                style={[
                  styles.iconBadge,
                  { backgroundColor: `${toneColor}20` },
                ]}
              >
                <Ionicons name={item.iconName} size={18} color={toneColor} />
              </View>

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
      gap: theme.spacing.sm,
    },
    list: {
      gap: theme.spacing.sm,
    },
    reviewCard: {
      alignItems: "center",
      flexDirection: "row",
      gap: theme.spacing.md,
      padding: theme.spacing.md,
    },
    iconBadge: {
      alignItems: "center",
      borderRadius: theme.borderRadius.full,
      height: 40,
      justifyContent: "center",
      width: 40,
    },
    copy: {
      flex: 1,
    },
    errorColumn: {
      alignItems: "flex-end",
    },
  });
