import { StyleSheet, View } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

type SmartPracticeHeroCardProps = {
  onStart?: () => void;
};

export function SmartPracticeHeroCard({ onStart }: SmartPracticeHeroCardProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.card}>
      <View style={styles.dueBadge}>
        <Ionicons name="flash" size={12} color={theme.colors.textOnPrimary} />
        <ThemedText variant="caption" style={styles.lightText}>
          7 items due
        </ThemedText>
      </View>

      <View style={styles.copy}>
        <ThemedText variant="heading3" style={styles.title}>
          Practice, but smarter
        </ThemedText>
        <ThemedText variant="bodySmall" style={styles.description}>
          Short, focused sessions powered by AI.
        </ThemedText>
      </View>

      <View style={styles.footer}>
        <ThemedButton
          title="Start smart session"
          onPress={() => onStart?.()}
          size="small"
          style={styles.startButton}
        />
        <View style={styles.totalColumn}>
          <ThemedText variant="heading3" style={styles.title}>
            10
          </ThemedText>
          <ThemedText variant="caption" style={styles.lightText}>
            total
          </ThemedText>
        </View>
      </View>
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.primaryDark,
      borderRadius: theme.borderRadius.xl,
      gap: theme.spacing.md,
      padding: theme.spacing.md,
    },
    dueBadge: {
      alignItems: "center",
      alignSelf: "flex-end",
      backgroundColor: "rgba(255, 255, 255, 0.18)",
      borderRadius: theme.borderRadius.full,
      flexDirection: "row",
      gap: theme.spacing.xs,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: 2,
    },
    copy: {
      gap: theme.spacing.xs,
    },
    title: {
      color: theme.colors.textOnPrimary,
    },
    description: {
      color: theme.colors.primaryLight,
    },
    lightText: {
      color: theme.colors.textOnPrimary,
      fontFamily: "LexendSemiBold",
      textTransform: "uppercase",
    },
    footer: {
      alignItems: "center",
      flexDirection: "row",
      gap: theme.spacing.sm,
      justifyContent: "space-between",
    },
    startButton: {
      flex: 1,
    },
    totalColumn: {
      alignItems: "center",
      minWidth: 48,
    },
  });
