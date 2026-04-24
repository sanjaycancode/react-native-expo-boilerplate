import { StyleSheet, View } from "react-native";

import type { ReactNode } from "react";

import { ThemedCard } from "@/components/ThemedCard";

import { useTheme } from "@/context/ThemeContext";

type ListItemProps = {
  icon: ReactNode;
  children: ReactNode;
};

export function ListItem({ icon, children }: ListItemProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <ThemedCard style={styles.card} variant="outlined">
      {icon}
      <View style={styles.content}>{children}</View>
    </ThemedCard>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    card: {
      alignItems: "center",
      flexDirection: "row",
      gap: theme.spacing.md,
      padding: theme.spacing.sm,
    },
    content: {
      flex: 1,
    },
  });
