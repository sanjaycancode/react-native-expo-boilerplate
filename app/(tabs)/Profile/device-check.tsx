import React from "react";
import { StyleSheet, View } from "react-native";

import { Stack } from "expo-router";

import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";

export default function DeviceCheckScreen() {
  return (
    <ThemedSafeAreaView>
      <Stack.Screen options={{ title: "Device Check" }} />
      <View style={styles.container}>
        <ThemedText variant="heading3">Device Check</ThemedText>
        <ThemedText semantic="muted">Coming soon.</ThemedText>
      </View>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 6,
  },
});

