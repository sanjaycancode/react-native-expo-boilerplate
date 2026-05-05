import React from "react";
import {
  Pressable,
  type PressableProps,
  StyleSheet,
  View,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

interface FilterPillProps extends Omit<PressableProps, "style"> {
  label: string;
  selected?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  size?: "default" | "compact";
}

export function FilterPill({
  label,
  selected = false,
  leadingIcon,
  trailingIcon,
  size = "default",
  ...pressableProps
}: FilterPillProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const isCompact = size === "compact";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{
        selected,
        disabled: Boolean(pressableProps.disabled),
      }}
      style={({ pressed }) => [
        styles.pill,
        isCompact && styles.pillCompact,
        selected && styles.pillSelected,
        pressed && !pressableProps.disabled && styles.pillPressed,
      ]}
      {...pressableProps}
    >
      {leadingIcon ? <View style={styles.icon}>{leadingIcon}</View> : null}
      <ThemedText
        variant={isCompact ? "caption" : "bodySmall"}
        semantic={selected ? "default" : "muted"}
        lightColor={selected ? theme.colors.textOnPrimary : undefined}
        darkColor={selected ? theme.colors.textOnPrimary : undefined}
        style={styles.label}
      >
        {label}
      </ThemedText>
      {trailingIcon ? <View style={styles.icon}>{trailingIcon}</View> : null}
    </Pressable>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    pill: {
      minHeight: 34,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: theme.spacing.xs,
      borderRadius: theme.borderRadius.full,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.background,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm + 1,
    },
    pillSelected: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primary,
    },
    pillCompact: {
      minHeight: 30,
      paddingHorizontal: theme.spacing.sm + 2,
      paddingVertical: theme.spacing.sm,
    },
    pillPressed: {
      opacity: 0.82,
    },
    icon: {
      alignItems: "center",
      justifyContent: "center",
    },
    label: {
      fontFamily: "LexendMedium",
    },
  });
