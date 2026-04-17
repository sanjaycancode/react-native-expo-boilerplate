import { StyleSheet, View } from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";

import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

type DashboardHeaderProps = {
  greeting: string;
  userName: string;
  streakCount: number;
};

function withOpacity(hexColor: string, opacity: number) {
  const alpha = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0");

  return `${hexColor}${alpha}`;
}

export function DashboardHeader({
  greeting,
  userName,
  streakCount,
}: DashboardHeaderProps) {
  const { theme } = useTheme();
  const colors = theme.colors;
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.profileContent}>
        <View style={styles.avatar}>
          <FontAwesome name="comment" size={18} color={colors.backgroundAlt} />
        </View>

        <View style={styles.greetingContent}>
          <ThemedText
            variant="caption"
            semantic="muted"
            style={styles.greeting}
          >
            {greeting}
          </ThemedText>
          <ThemedText
            variant="heading3"
            semantic="primary"
            style={styles.userName}
          >
            {userName}
          </ThemedText>
        </View>
      </View>

      <View style={styles.streakBadge}>
        <Ionicons name="flame" size={16} color={colors.primary} />
        <ThemedText variant="button" semantic="primary" style={styles.streak}>
          {streakCount}
        </ThemedText>
      </View>
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) => {
  const colors = theme.colors;

  return StyleSheet.create({
    container: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
    },
    profileContent: {
      alignItems: "center",
      flexDirection: "row",
      gap: theme.spacing.sm + 2,
    },
    avatar: {
      alignItems: "center",
      backgroundColor: colors.text,
      borderRadius: theme.borderRadius.full,
      height: 44,
      justifyContent: "center",
      width: 44,
    },
    greetingContent: {
      gap: 0,
    },
    greeting: {
      fontFamily: "LexendBold",
      fontSize: 10,
      letterSpacing: 3,
      lineHeight: 14,
      textTransform: "uppercase",
    },
    userName: {
      fontFamily: "LexendBold",
      fontSize: 22,
      lineHeight: 26,
    },
    streakBadge: {
      alignItems: "center",
      backgroundColor: withOpacity(colors.primaryLight, 0.28),
      borderRadius: theme.borderRadius.full,
      flexDirection: "row",
      gap: theme.spacing.xs + 2,
      justifyContent: "center",
      minWidth: 72,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm + 2,
    },
    streak: {
      fontFamily: "LexendBold",
      fontSize: 16,
      lineHeight: 20,
    },
  });
};
