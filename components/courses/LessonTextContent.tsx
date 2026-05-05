import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";

import { useTheme, useThemeColors } from "@/context/ThemeContext";

interface LessonTextContentProps {
  title: string;
  content: string;
}

export function LessonTextContent({ title, content }: LessonTextContentProps) {
  const { theme } = useTheme();
  const colors = useThemeColors();
  const styles = createStyles(theme);

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundAlt, borderColor: colors.border }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <ThemedText variant="body" semantic="muted" style={styles.body}>
          {content}
        </ThemedText>
      </ScrollView>
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    container: {
      width: "100%",
      minHeight: 220,
      maxHeight: 350,
      borderRadius: theme.borderRadius.large,
      borderWidth: 1,
      padding: theme.spacing.lg,
    },
    title: {
      marginBottom: theme.spacing.md,
    },
    body: {
      lineHeight: 24,
      textAlign: "justify",
    },
  });