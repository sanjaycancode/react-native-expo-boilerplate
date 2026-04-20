import { ScrollView, StyleSheet } from "react-native";

import { HighPriorityReviewSection } from "@/components/smart_practice/HighPriorityReviewSection";
import { PacingAnalysisCard } from "@/components/smart_practice/PacingAnalysisCard";
import { SkillHeatmapSection } from "@/components/smart_practice/SkillHeatmapSection";
import { SmartPracticeHeaderSection } from "@/components/smart_practice/SmartPracticeHeaderSection";
import { SmartPracticeHeroCard } from "@/components/smart_practice/SmartPracticeHeroCard";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";

import { useTheme } from "@/context/ThemeContext";

export default function SmartPracticeScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <ThemedSafeAreaView>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <SmartPracticeHeaderSection />
        <SmartPracticeHeroCard />
        <SkillHeatmapSection />
        <PacingAnalysisCard />
        <HighPriorityReviewSection />
      </ScrollView>
    </ThemedSafeAreaView>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      gap: theme.spacing.lg,
      paddingBottom: theme.spacing.xl,
      paddingHorizontal: theme.spacing.lg,
      paddingTop: theme.spacing.md,
    },
  });
