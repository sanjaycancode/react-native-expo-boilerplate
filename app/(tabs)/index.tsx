import { ScrollView, StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardHeroCard } from "@/components/dashboard/DashboardHeroCard";
import { DashboardTargetProgress } from "@/components/dashboard/DashboardTargetProgress";
import { DashboardTodayFocus } from "@/components/dashboard/DashboardTodayFocus";
import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { useThemeColors } from "@/context/ThemeContext";

const dashboardHeaderData = {
  greeting: "Good Morning",
  userName: "Prasun",
  streakCount: 6,
};

const dashboardHeroData = {
  eyebrow: "PTE Academic",
  title: "Build your PTE Academic score",
  primaryActionLabel: "Take Mock Test",
  secondaryActionLabel: "Daily Drills",
};

const targetProgressData = {
  currentScore: 20,
  targetScore: 79,
  examDate: "Oct 24",
};

const todayFocusData = {
  smartSessionLabel: "Start Smart Session",
  tasks: [
    {
      id: "describe-image",
      title: "PTE Describe Image",
      meta: "Speaking - 5 tasks left",
      iconName: "image-outline",
      tone: "primary",
    },
    {
      id: "reorder-paragraphs",
      title: "Reorder Paragraphs",
      meta: "Reading - 3 tasks left",
      iconName: "list-outline",
      tone: "tertiary",
    },
  ],
} as const;

export default function DashboardScreen() {
  const colors = useThemeColors();
  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.safeArea}>
      <DashboardHeader {...dashboardHeaderData} />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <DashboardHeroCard style={styles.heroCard} {...dashboardHeroData} />
        <DashboardTargetProgress {...targetProgressData} />
        <DashboardTodayFocus {...todayFocusData} />

        <ThemedCard variant="outlined">
          <ThemedText variant="caption" semantic="muted">
            Continue session
          </ThemedText>
          <ThemedText variant="button">Resume Algebra Foundations</ThemedText>
        </ThemedCard>

        <ThemedCard variant="outlined">
          <ThemedText variant="caption" semantic="muted">
            Quick actions
          </ThemedText>
          <ThemedText variant="button">
            Start quiz, review notes, or join class
          </ThemedText>
        </ThemedCard>

        <ThemedCard variant="outlined">
          <ThemedText variant="caption" semantic="muted">
            Progress
          </ThemedText>
          <ThemedText variant="button">
            12 lessons completed this week
          </ThemedText>
        </ThemedCard>

        <ThemedCard variant="outlined">
          <ThemedText variant="caption" semantic="muted">
            Recommendations
          </ThemedText>
          <ThemedText variant="button">
            Try Smart Practice for weak topics
          </ThemedText>
        </ThemedCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: ReturnType<typeof useThemeColors>) =>
  StyleSheet.create({
    safeArea: {
      backgroundColor: colors.background,
      flex: 1,
    },
    container: {
      gap: 12,
      padding: 16,
      paddingBottom: 32,
    },
    heroCard: {
      marginHorizontal: -4,
    },
  });
