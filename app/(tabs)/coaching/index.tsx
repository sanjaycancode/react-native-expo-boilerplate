import { StyleSheet, View } from "react-native";
import { useMemo } from "react";

import type { Href } from "expo-router";
import { Stack } from "expo-router";

import { ActionCard } from "@/components/ActionCard";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Themes";

import { useTheme } from "@/context/ThemeContext";
import { Spacing } from "@/constants/Themes";

type AppTheme = ReturnType<typeof useTheme>["theme"];

interface MenuItem {
  title: string;
  description: string;
  href: Href;
  iconName: string;
  iconBackgroundColor: string;
  iconColor: string;
}

export default function CoachingScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const iconBackgroundColor = Colors.light.primary;
  const iconForegroundColor = Colors.light.textOnPrimary;

  const menuList: MenuItem[] = useMemo(
    () => [
      {
        title: "Book Coach",
        description: "Browse & book sessions with  coaches.",
        href: "/bookCoach",
        iconName: "calendar-plus",
        iconBackgroundColor,
        iconColor: iconForegroundColor,
      },
      {
        title: "My Bookings",
        description: "View & manage your coaching sessions.",
        href: "/myBookings",
        iconName: "calendar-check",
        iconBackgroundColor,
        iconColor: iconForegroundColor,
      },
    ],
    [iconBackgroundColor, iconForegroundColor],
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Coaching" }} />

      <View>
        <ThemedText variant="heading2">Coaching</ThemedText>
        <ThemedText variant="body" semantic="muted">
          Personalized guidance & support from expert coaches.
        </ThemedText>
      </View>

      {menuList.map((item) => (
        <ActionCard
          key={item.title}
          href={item.href}
          iconName={item.iconName}
          iconBackgroundColor={item.iconBackgroundColor}
          iconColor={item.iconColor}
          title={item.title}
          description={item.description}
        />
      ))}
    </View>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: theme.spacing.lg,
      gap: theme.spacing.md,
    },
  });