import { StyleSheet, View } from "react-native";

import { Link, Stack, usePathname } from "expo-router";

import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

export default function NotFoundScreen() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />

      <View style={styles.container}>
        <ThemedText variant="mono">{pathname}</ThemedText>
        <ThemedText variant="heading3" semantic="error" style={styles.title}>
          This screen doesn't exist.
        </ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText
            variant="bodySmall"
            semantic="primary"
            style={styles.linkText}
          >
            Go to home screen!
          </ThemedText>
        </Link>
      </View>
    </>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing.md,
    },
    title: {
      marginBottom: theme.spacing.xs / 2,
    },
    link: {
      marginTop: theme.spacing.md,
      paddingVertical: theme.spacing.md,
    },
    linkText: {
      fontSize: 14,
    },
  });
