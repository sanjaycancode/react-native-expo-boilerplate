import { StyleSheet, View } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

type FeaturedMockTestCardProps = {
  onStart?: () => void;
};

export function FeaturedMockTestCard({ onStart }: FeaturedMockTestCardProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.card}>
      <View style={styles.tags}>
        <View style={styles.tag}>
          <ThemedText variant="caption" style={styles.tagText}>
            PTE
          </ThemedText>
        </View>
        <View style={styles.tag}>
          <ThemedText variant="caption" style={styles.tagText}>
            ACADEMIC
          </ThemedText>
        </View>
        <View style={styles.tag}>
          <Ionicons name="layers" size={14} color="#FFFFFF" />
          <ThemedText variant="caption" style={styles.tagText}>
            4 sections
          </ThemedText>
        </View>
      </View>

      <View style={styles.copy}>
        <ThemedText variant="button" style={styles.title}>
          SAMPLE PTE-ACAD TEST 1
        </ThemedText>
        <ThemedText variant="bodySmall" style={styles.description}>
          Full length simulation for real exam experience
        </ThemedText>
      </View>

      <ThemedButton
        title="Start Test"
        onPress={() => onStart?.()}
        variant="secondary"
        size="small"
      />
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.primaryDark,
      borderRadius: theme.borderRadius.xl,
      gap: theme.spacing.lg,
      padding: theme.spacing.lg,
    },
    tags: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: theme.spacing.sm,
    },
    tag: {
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255, 0.18)",
      borderRadius: theme.borderRadius.full,
      flexDirection: "row",
      gap: theme.spacing.xs,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.xs,
    },
    tagText: {
      color: "#FFFFFF",
      fontFamily: "LexendSemiBold",
    },
    copy: {
      gap: theme.spacing.xs,
    },
    title: {
      color: "#FFFFFF",
    },
    description: {
      color: theme.colors.primaryLight,
    },
  });
