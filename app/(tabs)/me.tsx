import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";

import { useThemeColors } from "@/context/ThemeContext";

export default function MeScreen() {
  const colors = useThemeColors();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Me</Text>
      <Text style={styles.subtitle}>Your account and personal updates.</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Profile</Text>
        <Text style={styles.cardMeta}>
          Manage personal details and preferences.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Notifications</Text>
        <Text style={styles.cardMeta}>Control reminders and app alerts.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Referrals</Text>
        <Text style={styles.cardMeta}>Invite friends and track rewards.</Text>
      </View>
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
