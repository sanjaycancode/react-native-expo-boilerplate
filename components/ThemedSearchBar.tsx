import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";

import { BorderRadius, Spacing } from "@/constants/Themes";
import { useThemeColors } from "@/context/ThemeContext";

interface ThemedSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function ThemedSearchBar({
  value,
  onChangeText,
  placeholder = "Search...",
}: ThemedSearchBarProps) {
  const colors = useThemeColors();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundAlt,
          borderColor: colors.border,
        },
      ]}
    >
      <FontAwesome
        name="search"
        size={16}
        color={colors.textSecondary}
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        style={[
          styles.input,
          {
            color: colors.text,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: BorderRadius.large,
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
    height: 48,
    alignSelf: "center",
    width: "100%",
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Lexend",
    paddingVertical: 0,
  },
});