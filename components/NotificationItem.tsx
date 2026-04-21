import React, { useMemo } from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps } from "react";

import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

export type NotificationItemCategory = "Unread" | "Bookings" | "Result";

export type NotificationItemProps = {
  title: string;
  description: string;
  timeAgo: string;
  iconName: ComponentProps<typeof Ionicons>["name"];
  category: NotificationItemCategory;
  onPress?: () => void;
  style?: ViewStyle;
};

function withOpacity(hexColor: string, opacity: number) {
  const alpha = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0");
  return `${hexColor}${alpha}`;
}

export function NotificationItem({
  title,
  description,
  timeAgo,
  iconName,
  onPress,
  style,
}: NotificationItemProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme.mode]);

  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.82}
      onPress={onPress}
      style={[styles.row, style]}
    >
      <View
        style={[
          styles.iconWrap,
          { backgroundColor: withOpacity(theme.colors.primary, 0.14) },
        ]}
      >
        <Ionicons name={iconName} size={18} color={theme.colors.primary} />
      </View>

      <View style={styles.copy}>
        <View style={styles.topLine}>
          <ThemedText
            variant="bodySmall"
            style={styles.title}
            numberOfLines={1}
          >
            {title}
          </ThemedText>
          <ThemedText variant="caption" semantic="muted">
            {timeAgo}
          </ThemedText>
        </View>

        <ThemedText
          variant="caption"
          style={styles.description}
          numberOfLines={2}
        >
          {description}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      gap: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
    },
    iconWrap: {
      height: 34,
      width: 34,
      borderRadius: theme.borderRadius.full,
      alignItems: "center",
      justifyContent: "center",
    },
    copy: {
      flex: 1,
      gap: 6,
      paddingTop: 1,
    },
    topLine: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: theme.spacing.md,
    },
    title: {
      flex: 1,
      fontFamily: theme.typography.bodySmall.fontFamily,
      fontWeight: "600",
      color: theme.colors.text,
    },
    description: {
      color: theme.colors.textSecondary,
    },
  });
