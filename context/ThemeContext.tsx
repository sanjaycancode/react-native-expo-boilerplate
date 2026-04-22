/**
 * Theme context and provider for managing app-wide theme
 */

import React, { createContext, useContext, useState } from "react";
import { useColorScheme } from "react-native";
import { ThemeProvider as NavigationThemeProvider } from "@react-navigation/native";

import {
  BorderRadius,
  Colors,
  getNavigationTheme,
  Shadows,
  Spacing,
  Typography,
} from "@/constants/Themes";

export type ThemeMode = "light" | "dark";
export type ThemePreference = ThemeMode | "system";

interface Theme {
  mode: ThemeMode;
  preference: ThemePreference;
  colors: typeof Colors.light | typeof Colors.dark;
  typography: typeof Typography;
  spacing: typeof Spacing;
  borderRadius: typeof BorderRadius;
  shadows: typeof Shadows;
  navigationTheme: ReturnType<typeof getNavigationTheme>;
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (preference: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [themePreference, setThemePreference] =
    useState<ThemePreference>("system");

  const resolvedMode: ThemeMode =
    themePreference === "system"
      ? ((systemColorScheme as ThemeMode) ?? "light")
      : themePreference;

  const theme: Theme = {
    mode: resolvedMode,
    preference: themePreference,
    colors: Colors[resolvedMode],
    typography: Typography,
    spacing: Spacing,
    borderRadius: BorderRadius,
    shadows: Shadows,
    navigationTheme: getNavigationTheme(resolvedMode),
  };

  const toggleTheme = () => {
    setThemePreference((prev) => {
      if (prev === "dark") return "light";
      return "dark";
    });
  };

  const setTheme = (preference: ThemePreference) => {
    setThemePreference(preference);
  };

  return (
    <NavigationThemeProvider value={theme.navigationTheme}>
      <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
        {children}
      </ThemeContext.Provider>
    </NavigationThemeProvider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

/**
 * Convenience hook for accessing only colors
 */
export function useThemeColors() {
  const { theme } = useTheme();
  return theme.colors;
}

/**
 * Convenience hook for accessing theme mode
 */
export function useThemeMode() {
  const { theme, toggleTheme, setTheme } = useTheme();
  return {
    mode: theme.mode,
    preference: theme.preference,
    toggleTheme,
    setTheme,
  };
}
