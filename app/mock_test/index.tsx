import { StyleSheet, View } from "react-native";

import { Stack } from "expo-router";

import { ThemedText } from "@/components/ThemedText";

export default function MockTestScreen() {
  const styles = createStyles();

  return (
    <>
      <Stack.Screen options={{ title: "Mock Test", headerShown: false }} />
      <View style={styles.container}>
        <ThemedText variant="heading2">Mock Test</ThemedText>
        <ThemedText variant="body" semantic="muted">
          Full-length timed practice tests will appear here.
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
