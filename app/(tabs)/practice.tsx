import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";

import { useThemeColors } from "@/context/ThemeContext";

export default function PracticeScreen() {
  const colors = useThemeColors();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Practice</Text>
      <Text style={styles.subtitle}>
        Sharpen your skills with quick exercises.
      </Text>
    </View>
  );
}

const createStyles = (colors: ReturnType<typeof useThemeColors>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      gap: 12,
    },
    title: {
      fontSize: 28,
      fontWeight: "700",
      color: colors.text,
    },
    subtitle: {
      fontSize: 15,
      color: colors.textSecondary,
      marginBottom: 8,
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 16,
      gap: 6,
    },
    exercise: {
      fontSize: 17,
      fontWeight: "600",
      color: colors.text,
    },
    meta: {
      fontSize: 14,
      color: colors.textSecondary,
    },
  });
