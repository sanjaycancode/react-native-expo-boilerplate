/**
 * Theme-aware button component
 */

import React, { useMemo } from "react";
import { Pressable, StyleSheet, TextStyle, ViewStyle } from "react-native";

import { ThemedText } from "@/components/ThemedText";

import { useThemeColors } from "@/context/ThemeContext";

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
  const colors = useThemeColors();

  const dynamicStyles = useMemo(() => {
    const getBackgroundColor = () => {
      if (disabled) return colors.disabled;
      switch (variant) {
        case "primary":
          return colors.primary;
        case "secondary":
          return colors.backgroundAlt;
        case "danger":
          return colors.error;
        default:
          return colors.primary;
      }
    };

    const getTextColor = () => {
      if (variant === "secondary") return colors.text;
      return "#fff";
    };

    const getPadding = () => {
      switch (size) {
        case "small":
          return styles.paddingSmall;
        case "large":
          return styles.paddingLarge;
        case "medium":
        default:
          return styles.paddingMedium;
      }
    };

    return StyleSheet.create({
      container: {
        backgroundColor: getBackgroundColor(),
      },
      textContent: {
        color: getTextColor(),
      },
      padding: getPadding(),
    });
  }, [colors, variant, size, disabled]);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        dynamicStyles.container,
        dynamicStyles.padding,
        { opacity: pressed && !disabled ? 0.8 : 1 },
        style,
      ]}
    >
      <ThemedText
        variant="heading5"
        style={[styles.text, dynamicStyles.textContent, textStyle]}
      >
        {title}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "LexendSemiBold",
  },
  paddingSmall: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  paddingMedium: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  paddingLarge: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
});
