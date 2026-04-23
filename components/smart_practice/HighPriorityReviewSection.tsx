import { StyleSheet, View } from "react-native";

import { IconBadge } from "@/components/IconBadge";
import { ListItem } from "@/components/ListItem";
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
      <ThemedText variant="heading6">High Priority Review</ThemedText>

      <View style={styles.list}>
        {smartPracticeReviewItems.map((item) => {
          const toneColor = getToneColor(item, theme);

          return (
            <ListItem
              key={item.id}
              icon={
                <IconBadge
                  name={item.iconName}
                  size={18}
                  color={toneColor}
                  badgeSize={36}
                  backgroundColor={`${toneColor}20`}
                />
              }
            >
              <View style={styles.contentRow}>
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
              </View>
            </ListItem>
          );
        })}
      </View>
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    section: {
      gap: theme.spacing.md,
    },
    list: {
      gap: theme.spacing.md,
    },
    contentRow: {
      alignItems: "center",
      flexDirection: "row",
      gap: theme.spacing.md,
      justifyContent: "space-between",
    },
    copy: {
      flex: 1,
      gap: theme.spacing.sm,
    },
    errorColumn: {
      alignItems: "flex-end",
      gap: theme.spacing.sm,
    },
  });
