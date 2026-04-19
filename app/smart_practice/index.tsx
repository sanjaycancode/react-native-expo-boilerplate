import { StyleSheet, View } from "react-native";

import { Stack } from "expo-router";

import { ThemedText } from "@/components/ThemedText";

export default function SmartPracticeScreen() {
  const styles = createStyles();

  return (
    <>
      <Stack.Screen options={{ title: "Smart Practice", headerShown: false }} />
      <View style={styles.container}>
        <ThemedText variant="heading2">Smart Practice</ThemedText>
        <ThemedText variant="body" semantic="muted">
          Adaptive practice based on your weakest concepts.
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
