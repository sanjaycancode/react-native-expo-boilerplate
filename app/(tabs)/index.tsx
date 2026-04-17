import { ScrollView, StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardHeroCard } from "@/components/dashboard/DashboardHeroCard";
import { DashboardPerformance } from "@/components/dashboard/DashboardPerformance";
import { DashboardTargetProgress } from "@/components/dashboard/DashboardTargetProgress";
import { DashboardTodayFocus } from "@/components/dashboard/DashboardTodayFocus";

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

const performanceData = {
  contributionTitle: "Activity Streak",
  contributionWeeks: [
    { month: "Jan", days: [0, 1, 0, 2, 1, 0, 1] },
    { days: [1, 2, 0, 3, 1, 0, 2] },
    { days: [0, 3, 1, 2, 0, 1, 4] },
    { days: [2, 1, 0, 4, 2, 1, 0] },
    { days: [1, 0, 2, 1, 3, 0, 1] },
    { days: [0, 2, 3, 1, 0, 4, 2] },
    { days: [1, 1, 0, 2, 4, 2, 0] },
    { days: [3, 0, 1, 1, 2, 0, 3] },
    { month: "Feb", days: [0, 1, 4, 2, 0, 1, 2] },
    { days: [2, 3, 1, 0, 2, 4, 1] },
    { days: [1, 0, 2, 3, 1, 0, 4] },
    { days: [0, 2, 1, 4, 3, 1, 0] },
    { days: [2, 0, 3, 1, 0, 2, 4] },
    { days: [0, 2, 3, 1, 0, 4, 2] },
    { days: [1, 1, 0, 2, 4, 2, 0] },
    { days: [3, 0, 1, 1, 2, 0, 3] },
    { month: "Mar", days: [1, 4, 2, 0, 1, 2, 3] },
    { days: [2, 3, 1, 0, 2, 4, 1] },
    { days: [1, 0, 2, 3, 1, 0, 4] },
    { days: [0, 2, 1, 4, 3, 1, 0] },
    { days: [3, 1, 0, 2, 4, 1, 2] },
    { days: [0, 2, 4, 1, 0, 3, 2] },
    { days: [1, 3, 0, 4, 2, 1, 0] },
    { days: [2, 0, 1, 3, 1, 4, 2] },
  ],
  stats: [
    {
      label: "Speaking",
      score: 78,
      change: 4,
      trend: "up",
    },
    {
      label: "Writing",
      score: 65,
      change: 2,
      trend: "down",
    },
    {
      label: "Reading",
      score: 71,
      change: 1,
      trend: "up",
    },
    {
      label: "Listening",
      score: 82,
      change: 5,
      trend: "up",
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
        <DashboardPerformance {...performanceData} />
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
