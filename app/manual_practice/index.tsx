import { StyleSheet, View } from "react-native";

import { Stack } from "expo-router";

import { ThemedText } from "@/components/ThemedText";

export default function ManualPracticeScreen() {
  const styles = createStyles();

  return (
    <>
      <Stack.Screen options={{ title: "Manual Practice", headerShown: false }} />
      <View style={styles.container}>
        <ThemedText variant="heading2">Manual Practice</ThemedText>
        <ThemedText variant="body" semantic="muted">
          Choose topics and difficulty to practice manually.
        </ThemedText>
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
