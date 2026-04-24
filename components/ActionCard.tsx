import type { ComponentProps } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Link, type Href } from "expo-router";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { useTheme, useThemeColors } from "@/context/ThemeContext";

type AppTheme = ReturnType<typeof useTheme>["theme"];

type Props = {
  href: Href;
  iconName: ComponentProps<typeof FontAwesome5>["name"];
  iconBackgroundColor: string;
  iconColor: string;
  title: string;
  description: string;
};

export function ActionCard({
  href,
  iconName,
  iconBackgroundColor,
  iconColor,
  title,
  description,
}: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const colors = useThemeColors();

  return (
    <Link href={href} asChild>
      <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}>
        <ThemedCard variant="outlined">
          <View style={styles.cardRow}>
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: iconBackgroundColor,
                  borderColor: colors.border,
                },
              ]}
            >
              <FontAwesome5 name={iconName} size={18} color={iconColor} />
            </View>

            <View style={styles.cardContent}>
              <ThemedText variant="bodySmall">{title}</ThemedText>
              <ThemedText variant="bodySmall" semantic="muted">
                {description}
              </ThemedText>
            </View>
          </View>
        </ThemedCard>
      </Pressable>
    </Link>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    cardRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: theme.spacing.md,
    },
    iconContainer: {
      width: 34,
      height: 34,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: theme.borderRadius.medium,
      borderWidth: 1,
    },
    cardContent: {
      flex: 1,
      gap: theme.spacing.xs,
    },
  });
