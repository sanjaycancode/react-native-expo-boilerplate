import { StyleSheet, View } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

import { MockTestSectionSet } from "./data";

type MockTestSectionSetCardProps = {
  sectionSet: MockTestSectionSet;
};

export function MockTestSectionSetCard({
  sectionSet,
}: MockTestSectionSetCardProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <ThemedCard style={styles.card}>
      <View style={styles.iconBadge}>
        <Ionicons
          name={sectionSet.iconName}
          size={22}
          color={theme.colors.primaryDark}
        />
      </View>
      <ThemedText variant="button">{sectionSet.title}</ThemedText>
      <ThemedText variant="caption">
        {sectionSet.practiceSetCount} practice sets
      </ThemedText>
    </ThemedCard>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    card: {
      flex: 1,
      gap: theme.spacing.md,
      minHeight: 160,
    },
    iconBadge: {
      alignItems: "center",
      backgroundColor: theme.colors.primaryLight,
      borderRadius: theme.borderRadius.full,
      height: 44,
      justifyContent: "center",
      width: 44,
    },
  });
