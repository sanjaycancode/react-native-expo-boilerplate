import { ComponentProps } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { useTheme } from "@/context/ThemeContext";

type IconBadgeProps = {
  name: ComponentProps<typeof Ionicons>["name"];
  size?: number;
  color?: string;
  badgeSize?: number;
  backgroundColor?: string;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
};

export function IconBadge({
  name,
  size = 22,
  color,
  badgeSize = 44,
  backgroundColor,
  borderRadius,
  style,
}: IconBadgeProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: backgroundColor ?? theme.colors.background,
          borderRadius: borderRadius ?? theme.borderRadius.full,
          height: badgeSize,
          width: badgeSize,
        },
        style,
      ]}
    >
      <Ionicons
        name={name}
        size={size}
        color={color ?? theme.colors.primaryDark}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: "center",
    justifyContent: "center",
  },
});
