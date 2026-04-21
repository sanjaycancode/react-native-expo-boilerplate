import React, { useMemo } from "react";
import {
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import { Link } from "expo-router";

import {
  FontAwesome,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

type IconFamily =
  | typeof FontAwesome
  | typeof MaterialIcons
  | typeof Ionicons
  | typeof MaterialCommunityIcons
  | typeof FontAwesome6;

type IconName = string;

export type ListItemProps = {
  key?: string;
  title: string;
  subtitle?: string;
  icon: IconName;
  iconFamily?: IconFamily;
  href?: string;
  onPress?: () => void;
  isLast?: boolean;
  style?: ViewStyle;
  isSwitch?: boolean;
  switchValue?: boolean;
  showArrow?: boolean;
};

export function ListItem({
  title,
  subtitle,
  icon,
  iconFamily = MaterialIcons,
  href,
  onPress,
  isLast = false,
  style,
  isSwitch = false,
  switchValue = false,
  showArrow = true,
}: ListItemProps) {
  const { theme } = useTheme();
  const styles = useMemo(
    () => createStyles(theme, isLast),
    [theme.mode, isLast],
  );

  const IconComponent = iconFamily;
  const iconName = icon as string;

  const content = (
    <TouchableOpacity
      onPress={isSwitch ? onPress : href ? undefined : onPress}
      style={[styles.row, style]}
    >
      <View style={styles.iconWrap}>
        <IconComponent
          name={iconName as string}
          size={18}
          color={theme.colors.primary}
        />
      </View>

      <View style={styles.textWrap}>
        <ThemedText variant="body" numberOfLines={1}>
          {title}
        </ThemedText>
        {subtitle ? (
          <ThemedText
            variant="caption"
            style={{ color: theme.colors.textTertiary }}
            numberOfLines={1}
          >
            {subtitle}
          </ThemedText>
        ) : null}
      </View>

      {isSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onPress}
          trackColor={{
            false: theme.colors.border,
            true: theme.colors.primary,
          }}
          thumbColor={
            switchValue ? theme.colors.primaryLight : theme.colors.textSecondary
          }
          ios_backgroundColor={theme.colors.border}
        />
      ) : showArrow ? (
        <MaterialIcons
          name="chevron-right"
          size={30}
          color={theme.colors.textSecondary}
        />
      ) : null}
    </TouchableOpacity>
  );

  if (!href && !isSwitch) return content;

  if (href) {
    return (
      <Link href={href} asChild>
        {content}
      </Link>
    );
  }

  return content;
}

const createStyles = (
  theme: ReturnType<typeof useTheme>["theme"],
  isLast: boolean,
) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      backgroundColor: theme.colors.backgroundAlt,
      borderBottomWidth: isLast ? 0 : 1,
      borderBottomColor: theme.colors.border,
      gap: theme.borderRadius.large,
    },
    rowPressed: {
      opacity: 0.85,
    },
    iconWrap: {
      width: 40,
      height: 40,
      borderRadius: theme.borderRadius.large,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.overlay,
    },
    textWrap: {
      flex: 1,
      gap: theme.spacing.xs,
    },
  });
