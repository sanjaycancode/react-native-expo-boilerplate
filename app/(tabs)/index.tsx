import { StyleSheet, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { useThemeColors } from "@/context/ThemeContext";

const dashboardHeaderData = {
  greeting: "Good Morning",
  userName: "Prasun",
  streakCount: 6,
};

export default function DashboardScreen() {
  const colors = useThemeColors();
  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.safeArea}>
      <DashboardHeader {...dashboardHeaderData} />

      <View style={styles.container}>
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
      </View>
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
      flex: 1,
      padding: 20,
      gap: 12,
    },
  });
