import { Platform, StyleSheet, View } from "react-native";

import { StatusBar } from "expo-status-bar";

import { ThemedText } from "@/components/ThemedText";

import { useThemeColors } from "@/context/ThemeContext";

export default function ModalScreen() {
  const colors = useThemeColors();

  return (
    <View style={styles.container}>
      <ThemedText variant="heading3" style={styles.title}>
        Modal
      </ThemedText>
      <View style={[styles.separator, { backgroundColor: colors.border }]} />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
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
