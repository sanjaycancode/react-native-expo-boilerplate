import { Pressable, StyleSheet, View } from "react-native";

import { Link } from "expo-router";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

export default function PracticeScreen() {
  const styles = createStyles();

  return (
    <View style={styles.container}>
      <View>
        <ThemedText variant="heading2">Practice</ThemedText>
        <ThemedText variant="body" semantic="muted">
          Sharpen your skills with targeted practice modes.
        </ThemedText>
      </View>

      <Link href="/practice/mock-test" asChild>
        <Pressable>
          <ThemedCard variant="outlined">
            <ThemedText variant="button">Mock Test</ThemedText>
            <ThemedText variant="bodySmall" semantic="muted">
              Simulate full exam conditions with timer.
            </ThemedText>
          </ThemedCard>
        </Pressable>
      </Link>

      <Link href="/practice/manual-practice" asChild>
        <Pressable>
          <ThemedCard variant="outlined">
            <ThemedText variant="button">Manual Practice</ThemedText>
            <ThemedText variant="bodySmall" semantic="muted">
              Pick topics and practice at your own pace.
            </ThemedText>
          </ThemedCard>
        </Pressable>
      </Link>

      <Link href="/practice/smart-practice" asChild>
        <Pressable>
          <ThemedCard variant="outlined">
            <ThemedText variant="button">Smart Practice</ThemedText>
            <ThemedText variant="bodySmall" semantic="muted">
              Adaptive drills based on weak areas.
            </ThemedText>
          </ThemedCard>
        </Pressable>
      </Link>
    </View>
  );
}

const createStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      gap: 16,
    },
  });
