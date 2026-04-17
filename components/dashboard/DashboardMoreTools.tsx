import { StyleSheet, View } from "react-native";

import type { ToolTileProps } from "@/components/dashboard/ToolTile";
import { ToolTile } from "@/components/dashboard/ToolTile";
import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

type DashboardMoreToolsProps = {
  tools: readonly ToolTileProps[];
};

export function DashboardMoreTools({ tools }: DashboardMoreToolsProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.section}>
      <ThemedText style={styles.sectionTitle}>More Tools</ThemedText>

      <View style={styles.grid}>
        {tools.map((tool) => (
          <ToolTile key={tool.title} {...tool} />
        ))}
      </View>
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) => {
  const colors = theme.colors;

  return StyleSheet.create({
    section: {
      gap: theme.spacing.sm,
    },
    sectionTitle: {
      color: colors.textSecondary,
      fontFamily: "LexendBold",
      fontSize: 11,
      letterSpacing: 1.6,
      lineHeight: 16,
      textTransform: "uppercase",
    },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: theme.spacing.sm,
    },
  });
};
