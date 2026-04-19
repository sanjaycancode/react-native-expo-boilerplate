import { Pressable, StyleSheet, View } from "react-native";

import { Link, Stack } from "expo-router";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

export default function LearnScreen() {
  const styles = createStyles();

  return (
    <>
      <Stack.Screen options={{ title: "Learn" }} />
      <View style={styles.container}>
        <View>
          <ThemedText variant="heading2">Learn</ThemedText>
          <ThemedText variant="body" semantic="muted">
            Build your concepts with guided learning.
          </ThemedText>
        </View>

        <Link href="/learn/courses" asChild>
          <Pressable>
            <ThemedCard variant="outlined">
              <ThemedText variant="button">Courses</ThemedText>
              <ThemedText variant="bodySmall" semantic="muted">
                Track structured programs and progress.
              </ThemedText>
            </ThemedCard>
          </Pressable>
        </Link>

        <Link href="/learn/classes" asChild>
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
    </>
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
