import { Pressable, StyleSheet, View } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps } from "react";

import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

export type ToolTileTone = "primary" | "accent" | "neutral";

export type ToolTileProps = {
  title: string;
  iconName: ComponentProps<typeof Ionicons>["name"];
  tone?: ToolTileTone;
  onPress?: () => void;
};

function withOpacity(hexColor: string, opacity: number) {
  const alpha = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0");

  return `${hexColor}${alpha}`;
}

export function ToolTile({
  title,
  iconName,
  tone = "primary",
  onPress,
}: ToolTileProps) {
  const { theme } = useTheme();
  const colors = theme.colors;
  const styles = createStyles(theme);

  const iconColor =
    tone === "accent"
      ? colors.accent
      : tone === "neutral"
        ? colors.textSecondary
        : colors.primary;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.tile, pressed && styles.pressed]}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: withOpacity(iconColor, 0.16) },
        ]}
      >
        <Ionicons name={iconName} size={19} color={iconColor} />
      </View>
      <ThemedText style={styles.title}>{title}</ThemedText>
    </Pressable>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) => {
  const colors = theme.colors;

  return StyleSheet.create({
    tile: {
      alignItems: "center",
      aspectRatio: 1.55,
      backgroundColor: colors.surface,
      borderColor: withOpacity(colors.border, 0.55),
      borderRadius: theme.borderRadius.xl,
      borderWidth: 1,
      flexBasis: "48%",
      flexGrow: 1,
      gap: theme.spacing.sm,
      justifyContent: "center",
      padding: theme.spacing.md,
    },
    iconContainer: {
      alignItems: "center",
      borderRadius: theme.borderRadius.full,
      height: 34,
      justifyContent: "center",
      width: 34,
    },
    title: {
      color: colors.text,
      fontFamily: "LexendBold",
      fontSize: 11,
      lineHeight: 16,
      textAlign: "center",
    },
    pressed: {
      opacity: 0.82,
      transform: [{ scale: 0.99 }],
    },
  });
};
