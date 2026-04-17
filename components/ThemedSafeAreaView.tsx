import React from "react";
import { StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useThemeColors } from "@/context/ThemeContext";

type ThemedSafeAreaViewProps = {
  children: React.ReactNode;
} & React.ComponentProps<typeof SafeAreaView>;

export function ThemedSafeAreaView({ children }: ThemedSafeAreaViewProps) {
  const colors = useThemeColors();

  const styles = createStyle(colors);

  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
}

const createStyle = (colors: ReturnType<typeof useThemeColors>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
  });
