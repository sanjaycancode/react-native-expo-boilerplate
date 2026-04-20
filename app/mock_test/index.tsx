import { ScrollView, StyleSheet } from "react-native";

import { Stack } from "expo-router";

import { FeaturedMockTestCard } from "@/components/mock_test/FeaturedMockTestCard";
import { MockTestHeaderSection } from "@/components/mock_test/MockTestHeaderSection";
import { MockTestSectionSetGrid } from "@/components/mock_test/MockTestSectionSetGrid";
import { RecentAttemptsSection } from "@/components/mock_test/RecentAttemptsSection";

import { useTheme } from "@/context/ThemeContext";

export default function MockTestScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <>
      <Stack.Screen options={{ title: "Mock Test", headerShown: false }} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <MockTestHeaderSection />
        <FeaturedMockTestCard />
        <MockTestSectionSetGrid />
        <RecentAttemptsSection />
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
      paddingBottom: theme.spacing.xl,
      paddingHorizontal: theme.spacing.lg,
      paddingTop: theme.spacing.xl,
    },
  });
