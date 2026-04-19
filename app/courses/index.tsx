import { StyleSheet, View } from "react-native";

import { Stack } from "expo-router";

import { ThemedText } from "@/components/ThemedText";

export default function CoursesScreen() {
  const styles = createStyles();

  return (
    <>
      <Stack.Screen options={{ title: "Courses", headerShown: false }} />
      <View style={styles.container}>
        <ThemedText variant="heading2">Courses</ThemedText>
        <ThemedText variant="body" semantic="muted">
          Browse and continue your structured course tracks.
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
