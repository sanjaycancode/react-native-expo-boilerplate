import { Platform, StyleSheet } from "react-native";

import { StatusBar } from "expo-status-bar";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function ModalScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText variant="heading3" style={styles.title}>
        Modal
      </ThemedText>
      <ThemedView
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginBottom: 2,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
