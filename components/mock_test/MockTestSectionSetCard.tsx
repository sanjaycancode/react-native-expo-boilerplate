import { StyleSheet } from "react-native";

import { IconBadge } from "@/components/IconBadge";
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
      <IconBadge name={sectionSet.iconName} />
      <ThemedText variant="xs">{sectionSet.title}</ThemedText>
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
      gap: theme.spacing.sm,
      minHeight: 132,
      padding: theme.spacing.md,
    },
  });
