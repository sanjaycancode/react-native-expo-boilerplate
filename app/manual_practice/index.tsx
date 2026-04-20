import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { Stack } from "expo-router";

import { manualPracticeSections } from "@/components/manual_practice/data";
import { ManualPracticeHeaderSection } from "@/components/manual_practice/ManualPracticeHeaderSection";
import { ManualPracticeSection } from "@/components/manual_practice/ManualPracticeSection";
import { ManualPracticeTypeTabs } from "@/components/manual_practice/ManualPracticeTypeTabs";
import { ManualPracticeType } from "@/components/manual_practice/types";

import { useTheme } from "@/context/ThemeContext";

export default function ManualPracticeScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [selectedType, setSelectedType] =
    useState<ManualPracticeType>("All types");
  const visibleSections =
    selectedType === "All types"
      ? manualPracticeSections
      : manualPracticeSections.filter((section) => section.type === selectedType);

  return (
    <>
      <Stack.Screen
        options={{ title: "Manual Practice", headerShown: false }}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ManualPracticeHeaderSection />
        <ManualPracticeTypeTabs
          selectedType={selectedType}
          onSelectType={setSelectedType}
        />

        {visibleSections.map((section) => (
          <ManualPracticeSection key={section.type} section={section} />
        ))}
      </ScrollView>
    </>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      gap: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      paddingTop: theme.spacing.md,
      paddingBottom: theme.spacing.xl,
    },
  });
