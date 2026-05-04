import { type StyleProp, StyleSheet, View, type ViewStyle } from "react-native";

import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

type InfoBadgeTone = "default" | "accent" | "warning";

type InfoBadgeProps = {
  label: string;
  tone?: InfoBadgeTone;
  bordered?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function InfoBadge({
  label,
  tone = "default",
  bordered = true,
  style,
}: InfoBadgeProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const colors = getToneColors(theme, tone);

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: colors.backgroundColor,
          borderColor: bordered ? colors.borderColor : "transparent",
          borderWidth: bordered ? 1 : 0,
        },
        style,
      ]}
    >
      <ThemedText
        variant="caption"
        style={[
          styles.text,
          {
            color: colors.color,
          },
        ]}
      >
        {label}
      </ThemedText>
    </View>
  );
}

function getToneColors(
  theme: ReturnType<typeof useTheme>["theme"],
  tone: InfoBadgeTone,
) {
  switch (tone) {
    case "accent":
      return {
        backgroundColor: theme.colors.background,
        borderColor: theme.colors.textSecondary,
        color: theme.colors.primaryDark,
      };
    case "warning":
      return {
        backgroundColor: theme.colors.background,
        borderColor: theme.colors.warning,
        color: theme.colors.warning,
      };
    default:
      return {
        backgroundColor: theme.colors.background,
        borderColor: theme.colors.border,
        color: theme.colors.textSecondary,
      };
  }
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    badge: {
      borderRadius: theme.borderRadius.full,
      paddingHorizontal: theme.spacing.xs + 2,
      paddingVertical: 1,
    },
    text: {
      fontFamily: "LexendSemiBold",
      fontSize: 9,
      lineHeight: 10,
    },
  });
