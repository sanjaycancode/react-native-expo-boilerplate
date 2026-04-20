import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Stack } from "expo-router";

import { ManualPracticeHeaderSection } from "@/components/manual_practice/ManualPracticeHeaderSection";
import { ManualPracticeTypeTabs } from "@/components/manual_practice/ManualPracticeTypeTabs";
import { ManualPracticeType } from "@/components/manual_practice/types";

import { useTheme } from "@/context/ThemeContext";

export default function ManualPracticeScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [selectedType, setSelectedType] =
    useState<ManualPracticeType>("All types");

  return (
    <>
      <Stack.Screen
        options={{ title: "Manual Practice", headerShown: false }}
      />
      <View style={styles.container}>
        <ManualPracticeHeaderSection />
        <ManualPracticeTypeTabs
          selectedType={selectedType}
          onSelectType={setSelectedType}
        />
      </View>
    </>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: theme.spacing.lg,
      paddingTop: theme.spacing.md,
      gap: theme.spacing.sm,
    },
  });
