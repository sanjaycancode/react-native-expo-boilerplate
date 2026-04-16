import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";

import { useThemeColors } from "@/context/ThemeContext";

export default function SettingsScreen() {
  const colors = useThemeColors();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Manage your account and preferences.</Text>

      <View style={styles.row}>
        <Text style={styles.rowLabel}>Theme</Text>
        <Text style={styles.rowValue}>System</Text>
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
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: colors.surface,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 16,
    },
    rowLabel: {
      fontSize: 16,
      color: colors.text,
    },
    rowValue: {
      fontSize: 14,
      color: colors.textSecondary,
    },
  });
