import { useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { type Href,Link, Stack } from "expo-router";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

type AppTheme = ReturnType<typeof useTheme>["theme"];

interface MenuItem {
  title: string;
  description: string;
  href: Href;
}

export default function CoachingScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const menuList: MenuItem[] = useMemo(
    () => [
      {
        title: "Book Coach",
        description: "Browse & book sessions with available coaches.",
        href: "/book_coach",
      },
      {
        title: "My Bookings",
        description: "View & manage your coaching sessions.",
        href: "/my_bookings",
      },
    ],
    [],
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
        <Link href={item.href} asChild key={item.title}>
          <TouchableOpacity activeOpacity={0.9}>
            <ThemedCard>
              <ThemedText variant="button">{item.title}</ThemedText>
              <ThemedText variant="bodySmall" semantic="muted">
                {item.description}
              </ThemedText>
            </ThemedCard>
          </TouchableOpacity>
        </Link>
      ))}
    </View>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: theme.spacing.md,
      gap: theme.spacing.md,
      paddingHorizontal: theme.spacing.md,
    },
  });
