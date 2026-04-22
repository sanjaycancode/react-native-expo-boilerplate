import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { Stack } from "expo-router";

import { IconBadge } from "@/components/IconBadge";
import { TaskItem } from "@/components/TaskItem";
import { ThemedText } from "@/components/ThemedText";

import { useTheme, useThemeMode } from "@/context/ThemeContext";

export default function AppearanceScreen() {
  const { theme } = useTheme();
  const colors = theme.colors;
  const { preference, setTheme } = useThemeMode();

  const styles = useMemo(() => createStyles(theme), [theme.mode]);
  const options = useMemo(
    () =>
      [
        {
          key: "system",
          title: "System",
          description: "Follow your device appearance settings.",
          iconName: "settings-outline" as const,
        },
        {
          key: "light",
          title: "Light",
          description: "Bright background with dark text.",
          iconName: "sunny-outline" as const,
        },
        {
          key: "dark",
          title: "Dark",
          description: "Dark background optimized for low light.",
          iconName: "moon-outline" as const,
        },
      ] as const,
    [],
  );

  return (
    <>
      <Stack.Screen
        options={{ title: "Appearance", headerBackTitle: "Profile" }}
      />
      <View style={styles.container}>
        <ThemedText variant="button">Theme</ThemedText>
        <ThemedText variant="bodySmall" semantic="muted">
          System is the default. We’ll follow your device settings
          automatically.
        </ThemedText>

        <View style={styles.list}>
          {options.map((option) => {
            const selected = preference === option.key;

            return (
              <TaskItem
                key={option.key}
                title={option.title}
                meta={option.description}
                iconName={option.iconName}
                showChevron={false}
                onPress={() => setTheme(option.key)}
                rightAccessory={
                  <IconBadge
                    accessibilityRole="radio"
                    accessibilityState={{ selected }}
                    name={selected ? "radio-button-on" : "radio-button-off"}
                    size={20}
                    color={selected ? colors.primary : colors.textTertiary}
                    badgeSize={22}
                    backgroundColor="transparent"
                    borderRadius={0}
                  />
                }
                style={[styles.row, selected && styles.rowSelected]}
              />
            );
          })}
        </View>

        <View style={styles.infoBox}>
          <IconBadge
            name="information-circle-outline"
            size={16}
            color={colors.primary}
            badgeSize={28}
            backgroundColor={`${colors.primary}1F`}
            borderRadius={theme.borderRadius.medium}
            style={{ borderWidth: 1, borderColor: `${colors.primary}2E` }}
          />
          <ThemedText
            variant="caption"
            semantic="muted"
            style={styles.infoText}
          >
            If you choose System, the app will switch automatically when your
            device switches between light and dark.
          </ThemedText>
        </View>
      </View>
    </>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: theme.spacing.lg,
      gap: theme.spacing.sm,
    },
    list: {
      gap: theme.spacing.sm,
      paddingTop: theme.spacing.xs,
    },
    row: {
      minHeight: 60,
    },
    rowSelected: {
      borderColor: theme.colors.focusRing,
      borderWidth: 2,
    },
    infoBox: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,
      paddingTop: theme.spacing.sm,
    },
    infoText: {
      flex: 1,
    },
  });
