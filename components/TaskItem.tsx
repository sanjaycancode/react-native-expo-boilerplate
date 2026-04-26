import React, { ElementType, ReactNode } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps } from "react";

import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

export type FocusTaskTone = "primary" | "tertiary";

type IconFamily = ElementType;

export type TaskItemProps = {
  title: string;
  meta?: string;
  iconName?: ComponentProps<typeof Ionicons>["name"];
  icon?: string;
  iconFamily?: IconFamily;
  tone?: FocusTaskTone;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  showChevron?: boolean;
  rightAccessory?: ReactNode;
};

function withOpacity(hexColor: string, opacity: number) {
  const alpha = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0");

  return `${hexColor}${alpha}`;
}

export function TaskItem({
  title,
  iconName,
  icon,
  iconFamily,
  meta,
  onPress,
  disabled = false,
  style,
  showChevron = true,
  rightAccessory,
}: TaskItemProps) {
  const { theme } = useTheme();
  const colors = theme.colors;
  const styles = createStyles(theme);
  const iconColor = colors.primary;
  const IconComponent = iconFamily ?? Ionicons;
  const resolvedIconName = (iconName ?? icon ?? "ellipse") as string;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.bar,
        style,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: withOpacity(iconColor, 0.14) },
        ]}
      >
        <IconComponent name={resolvedIconName} size={18} color={iconColor} />
      </View>

      <View style={styles.copy}>
        <ThemedText variant="bodySmall">{title}</ThemedText>
        {meta ? (
          <ThemedText variant="caption" semantic="muted">
            {meta}
          </ThemedText>
        ) : null}
      </View>

      {rightAccessory ? (
        rightAccessory
      ) : showChevron ? (
        <Ionicons
          name="chevron-forward"
          size={18}
          color={colors.textTertiary}
        />
      ) : null}
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
    pressed: {
      opacity: 0.82,
      transform: [{ scale: 0.99 }],
    },
    disabled: {
      opacity: 0.55,
    },
  });
};
