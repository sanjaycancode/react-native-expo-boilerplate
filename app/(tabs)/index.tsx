import { ScrollView, StyleSheet } from "react-native";

import { Header } from "@/components/dashboard/Header";
import { HeroCard } from "@/components/dashboard/HeroCard";
import { Progress } from "@/components/dashboard/Progress";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { Recommendations } from "@/components/dashboard/Recommendations";

export default function DashboardScreen() {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Header />
      <HeroCard />
      <QuickActions />
      <Progress />
      <Recommendations />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 32,
    gap: 24,
  },
});
