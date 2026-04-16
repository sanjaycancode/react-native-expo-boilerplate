import { Pressable, StyleSheet } from "react-native";

import { Link } from "expo-router";

import { Text, View } from "@/components/Themed";

import { useThemeColors } from "@/context/ThemeContext";

export default function LearnScreen() {
  const colors = useThemeColors();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Learn</Text>
      <Text style={styles.subtitle}>
        Build your concepts with guided learning.
      </Text>

      <Link href="/(tabs)/learn/courses" asChild>
        <Pressable style={styles.card}>
          <Text style={styles.cardTitle}>Courses</Text>
          <Text style={styles.cardMeta}>
            Track structured programs and progress.
          </Text>
        </Pressable>
      </Link>

      <Link href="/(tabs)/learn/classes" asChild>
        <Pressable style={styles.card}>
          <Text style={styles.cardTitle}>Classes</Text>
          <Text style={styles.cardMeta}>
            Join live and recorded classroom sessions.
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
