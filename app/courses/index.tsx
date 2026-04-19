import { StyleSheet, View } from "react-native";

import { Link, Stack } from "expo-router";

import { HeaderBackButton } from "@/components/HeaderBackButton";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";

export default function CoursesScreen() {
  const styles = createStyles();

  return (
    <>
      <Stack.Screen
        options={{
          title: "Courses",
          headerBackTitle: "Learn",
          headerLeft: HeaderBackButton,
        }}
      />
      <View style={styles.container}>
        <ThemedText variant="heading2">Courses</ThemedText>
        <ThemedText variant="body" semantic="muted">
          Browse and continue your structured course tracks.
        </ThemedText>

        <Link href="../courses/234/detail" asChild>
          <ThemedButton title="Navigate to Demo Course" onPress={() => {}} />
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
