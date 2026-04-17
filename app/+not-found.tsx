import { StyleSheet, View } from "react-native";

import { Link, Stack } from "expo-router";

import { ThemedText } from "@/components/ThemedText";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />

      <View style={styles.container}>
        <ThemedText variant="heading3" semantic="error" style={styles.title}>
          This screen doesn't exist.
        </ThemedText>

        <Link href="/" style={styles.link}>
          <ThemedText
            variant="bodySmall"
            semantic="primary"
            style={styles.linkText}
          >
            Go to home screen!
          </ThemedText>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    marginBottom: 2,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
  },
});
