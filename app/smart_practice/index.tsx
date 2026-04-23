import { ScrollView, StyleSheet } from "react-native";

import { Stack } from "expo-router";

import { HighPriorityReviewSection } from "@/components/smart_practice/HighPriorityReviewSection";
import { PacingAnalysisCard } from "@/components/smart_practice/PacingAnalysisCard";
import { SkillHeatmapSection } from "@/components/smart_practice/SkillHeatmapSection";
import { SmartPracticeHeroCard } from "@/components/smart_practice/SmartPracticeHeroCard";

import { useTheme } from "@/context/ThemeContext";

export default function SmartPracticeScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <>
      <Stack.Screen options={{ title: "Smart Practice", headerShown: false }} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <SmartPracticeHeroCard />
        <SkillHeatmapSection />
        <PacingAnalysisCard />
        <HighPriorityReviewSection />
      </ScrollView>
    </>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      gap: theme.spacing.lg,
      paddingBottom: theme.spacing.xs,
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.md,
    },
  });
