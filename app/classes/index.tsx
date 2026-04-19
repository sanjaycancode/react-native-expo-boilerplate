import { StyleSheet, View } from "react-native";

import { Stack } from "expo-router";

import { ThemedText } from "@/components/ThemedText";

export default function ClassesScreen() {
  const styles = createStyles();

  return (
    <>
      <Stack.Screen
        options={{
          title: "Classes",
          headerShown: false,
        }}
      />
      <View style={styles.container}>
        <ThemedText variant="heading2">Classes</ThemedText>
        <ThemedText variant="body" semantic="muted">
          Access live classes and replays from your mentors.
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
