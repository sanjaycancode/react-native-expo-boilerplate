import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

type PageHeaderSectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PageHeaderSection({
  eyebrow,
  title,
  description,
}: PageHeaderSectionProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.headerSection}>
      {eyebrow ? (
        <ThemedText variant="caption" semantic="muted">
          {eyebrow}
        </ThemedText>
      ) : null}
      <ThemedText variant="heading2">{title}</ThemedText>
      {description ? (
        <ThemedText variant="bodySmall" semantic="muted">
          {description}
        </ThemedText>
      ) : null}
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    headerSection: {
      gap: theme.spacing.xs,
    },
  });
