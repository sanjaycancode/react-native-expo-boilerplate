import React, { useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";

import { ThemedText } from "@/components/ThemedText";

import { useThemeColors } from "@/context/ThemeContext";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function getFormattedDate(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function Header() {
  const colors = useThemeColors();

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        avatar: {
          backgroundColor: colors.primary,
        },
        bellIcon: {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
        notificationDot: {
          backgroundColor: colors.error,
        },
      }),
    [colors],
  );

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <ThemedText variant="heading3">{getGreeting()}</ThemedText>
        <ThemedText variant="bodySmall" semantic="muted">
          {getFormattedDate()}
        </ThemedText>
      </View>
      <View style={styles.right}>
        <Pressable style={[styles.bellIcon, dynamicStyles.bellIcon]}>
          <FontAwesome name="bell-o" size={18} color={colors.textSecondary} />
          <View style={[styles.notificationDot, dynamicStyles.notificationDot]} />
        </Pressable>
        <View style={[styles.avatar, dynamicStyles.avatar]}>
          <FontAwesome name="user" size={18} color={colors.textOnPrimary} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 4,
  },
  left: {
    flex: 1,
    gap: 2,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  bellIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    position: "relative",
  },
  notificationDot: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
