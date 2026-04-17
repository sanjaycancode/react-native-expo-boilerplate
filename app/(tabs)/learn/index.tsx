import { Pressable, StyleSheet, View } from "react-native";

import { Link } from "expo-router";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

export default function LearnScreen() {
  const styles = createStyles();

  return (
    <View style={styles.container}>
      <View>
        <ThemedText variant="heading2">Learn</ThemedText>
        <ThemedText variant="body" semantic="muted">
          Build your concepts with guided learning.
        </ThemedText>
      </View>

      <Link href="/(tabs)/learn/courses" asChild>
        <Pressable>
          <ThemedCard variant="outlined">
            <ThemedText variant="button">Courses</ThemedText>
            <ThemedText variant="bodySmall" semantic="muted">
              Track structured programs and progress.
            </ThemedText>
          </ThemedCard>
        </Pressable>
      </Link>

      <Link href="/(tabs)/learn/classes" asChild>
        <Pressable>
          <ThemedCard variant="outlined">
            <ThemedText variant="button">Classes</ThemedText>
            <ThemedText variant="bodySmall" semantic="muted">
              Join live and recorded classroom sessions.
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
      gap: 12,
    },
  });
