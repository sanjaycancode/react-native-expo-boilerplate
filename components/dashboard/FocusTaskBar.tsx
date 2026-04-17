import { Pressable, StyleSheet, View } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps } from "react";

import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

export type FocusTaskTone = "primary" | "tertiary";

export type FocusTaskBarProps = {
  title: string;
  meta: string;
  iconName: ComponentProps<typeof Ionicons>["name"];
  tone?: FocusTaskTone;
  onPress?: () => void;
};

function withOpacity(hexColor: string, opacity: number) {
  const alpha = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0");

  return `${hexColor}${alpha}`;
}

export function FocusTaskBar({
  title,
  meta,
  iconName,
  tone = "tertiary",
  onPress,
}: FocusTaskBarProps) {
  const { theme } = useTheme();
  const colors = theme.colors;
  const styles = createStyles(theme);
  const iconColor = tone === "primary" ? colors.primary : colors.accent;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.bar, pressed && styles.pressed]}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: withOpacity(iconColor, 0.14) },
        ]}
      >
        <Ionicons name={iconName} size={18} color={iconColor} />
      </View>

      <View style={styles.copy}>
        <ThemedText style={styles.title}>{title}</ThemedText>
        <ThemedText style={styles.meta}>{meta}</ThemedText>
      </View>

      <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
    </Pressable>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) => {
  const colors = theme.colors;

  return StyleSheet.create({
    bar: {
      alignItems: "center",
      backgroundColor: colors.surface,
      borderColor: withOpacity(colors.border, 0.55),
      borderRadius: theme.borderRadius.large,
      borderWidth: 1,
      flexDirection: "row",
      gap: theme.spacing.md,
      minHeight: 64,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm + 2,
    },
    iconContainer: {
      alignItems: "center",
      borderRadius: theme.borderRadius.medium,
      height: 38,
      justifyContent: "center",
      width: 38,
    },
    copy: {
      flex: 1,
      gap: 2,
    },
    title: {
      color: colors.text,
      fontFamily: "LexendSemiBold",
      fontSize: 13,
      lineHeight: 18,
    },
    meta: {
      color: colors.textSecondary,
      fontFamily: "Lexend",
      fontSize: 10,
      lineHeight: 14,
    },
    pressed: {
      opacity: 0.82,
      transform: [{ scale: 0.99 }],
    },
  });
};
