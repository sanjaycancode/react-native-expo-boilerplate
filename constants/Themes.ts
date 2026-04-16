/**
 * Comprehensive theme configuration for the application
 */

import { DarkTheme, DefaultTheme } from "@react-navigation/native";

export const Colors = {
  light: {
    // Primary
    primary: "#2f95dc",
    primaryLight: "#58a8f0",
    primaryDark: "#1a5cb8",

    // Semantic
    text: "#000",
    textSecondary: "#666",
    textTertiary: "#999",
    background: "#fff",
    backgroundAlt: "#f9f9f9",
    border: "#e0e0e0",

    // Status
    success: "#4caf50",
    warning: "#ff9800",
    error: "#f44336",
    info: "#2196f3",

    // UI
    tint: "#2f95dc",
    tabIconDefault: "#ccc",
    tabIconSelected: "#2f95dc",
    disabled: "#ccc",
    overlay: "rgba(0, 0, 0, 0.1)",
  },
  dark: {
    // Primary
    primary: "#fff",
    primaryLight: "#f0f0f0",
    primaryDark: "#e0e0e0",

    // Semantic
    text: "#fff",
    textSecondary: "#999",
    textTertiary: "#666",
    background: "#000",
    backgroundAlt: "#1a1a1a",
    border: "#333",

    // Status
    success: "#81c784",
    warning: "#ffb74d",
    error: "#ef5350",
    info: "#64b5f6",

    // UI
    tint: "#fff",
    tabIconDefault: "#ccc",
    tabIconSelected: "#fff",
    disabled: "#666",
    overlay: "rgba(255, 255, 255, 0.1)",
  },
} as const;

/**
 * Generate React Navigation theme from custom theme colors
 */
export function getNavigationTheme(mode: "light" | "dark") {
  const colors = Colors[mode];
  const baseTheme = mode === "light" ? DefaultTheme : DarkTheme;

  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.backgroundAlt,
      text: colors.text,
      border: colors.border,
      notification: colors.error,
    },
  };
}

export const Typography = {
  heading1: {
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 40,
    fontFamily: "LexendBold",
  },
  heading2: {
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 36,
    fontFamily: "LexendBold",
  },
  heading3: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 32,
    fontFamily: "LexendSemiBold",
  },
  body: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
    fontFamily: "Lexend",
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    fontFamily: "Lexend",
  },
  caption: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
    fontFamily: "Lexend",
  },
  button: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
    fontFamily: "LexendSemiBold",
  },
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const BorderRadius = {
  small: 4,
  medium: 8,
  large: 12,
  xl: 16,
  full: 9999,
} as const;

export const Shadows = {
  light: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  heavy: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
} as const;

export type Theme = typeof Colors.light;
export type ColorName = keyof Theme;
