/**
 * Theme-aware button component
 */

import React from "react";
import { Pressable, StyleSheet, TextStyle, ViewStyle } from "react-native";

import { ThemedText } from "@/components/ThemedText";

import { useTheme, useThemeColors } from "@/context/ThemeContext";

interface ThemedButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function ThemedButton({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  style,
  textStyle,
}: ThemedButtonProps) {
  const { theme } = useTheme();
  const colors = useThemeColors();
  const styles = createStyles(theme, colors, variant, size, disabled);
  const labelVariant = getLabelVariant(size);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        { opacity: pressed && !disabled ? 0.8 : 1 },
        style,
      ]}
    >
      <ThemedText variant={labelVariant} style={[styles.text, textStyle]}>
        {title}
      </ThemedText>
    </Pressable>
  );
}

function getLabelVariant(size: NonNullable<ThemedButtonProps["size"]>) {
  switch (size) {
    case "small":
      return "bodySmall";
    case "large":
      return "heading6";
    case "medium":
    default:
      return "body";
  }
}

const createStyles = (
  theme: ReturnType<typeof useTheme>["theme"],
  colors: ReturnType<typeof useThemeColors>,
  variant: NonNullable<ThemedButtonProps["variant"]>,
  size: NonNullable<ThemedButtonProps["size"]>,
  disabled: boolean,
) => {
  const getBackgroundColor = () => {
    if (disabled) return colors.disabled;

    switch (variant) {
      case "secondary":
        return colors.surface;
      case "danger":
        return colors.error;
      case "primary":
      default:
        return colors.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return colors.textTertiary;

    if (variant === "secondary") return colors.text;
    return colors.textOnPrimary;
  };

  const getPadding = () => {
    switch (size) {
      case "small":
        return {
          paddingVertical: theme.spacing.sm,
          paddingHorizontal: theme.spacing.md,
        };
      case "large":
        return {
          paddingVertical: theme.spacing.lg,
          paddingHorizontal: theme.spacing.xl,
        };
      case "medium":
      default:
        return {
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.lg,
        };
    }
  };

  return StyleSheet.create({
    button: {
      borderRadius: theme.borderRadius.medium,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: getBackgroundColor(),
      ...getPadding(),
    },
    text: {
      color: getTextColor(),
    },
  });
};
