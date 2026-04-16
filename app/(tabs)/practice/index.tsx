import { Link } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";

import { useThemeColors } from "@/context/ThemeContext";

export default function PracticeScreen() {
  const colors = useThemeColors();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Practice</Text>
      <Text style={styles.subtitle}>
        Sharpen your skills with targeted practice modes.
      </Text>

      <Link href="/(tabs)/practice/mock-test" asChild>
        <Pressable style={styles.card}>
          <Text style={styles.cardTitle}>Mock Test</Text>
          <Text style={styles.cardMeta}>
            Simulate full exam conditions with timer.
          </Text>
        </Pressable>
      </Link>

      <Link href="/(tabs)/practice/manual-practice" asChild>
        <Pressable style={styles.card}>
          <Text style={styles.cardTitle}>Manual Practice</Text>
          <Text style={styles.cardMeta}>
            Pick topics and practice at your own pace.
          </Text>
        </Pressable>
      </Link>

      <Link href="/(tabs)/practice/smart-practice" asChild>
        <Pressable style={styles.card}>
          <Text style={styles.cardTitle}>Smart Practice</Text>
          <Text style={styles.cardMeta}>
            Adaptive drills based on weak areas.
          </Text>
        </Pressable>
      </Link>
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
    cardTitle: {
      fontSize: 17,
      fontWeight: "600",
      color: colors.text,
    },
    cardMeta: {
      fontSize: 14,
      color: colors.textSecondary,
    },
  });
