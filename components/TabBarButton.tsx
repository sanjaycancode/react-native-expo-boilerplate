import type { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { Pressable, StyleSheet, View } from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import type { ComponentProps } from "react";

import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

type IconName = ComponentProps<typeof FontAwesome>["name"];

type BaseTabBarButtonProps = Omit<BottomTabBarButtonProps, "ref">;

type TabBarButtonProps = BaseTabBarButtonProps & {
  iconName: IconName;
  label: string;
};

export function TabBarButton({
  iconName,
  label,
  ...buttonProps
}: TabBarButtonProps) {
  const pressableProps: BaseTabBarButtonProps = buttonProps;

  const { theme } = useTheme();

  const ariaSelected = pressableProps["aria-selected"];
  const focused = ariaSelected === true;
  const color = focused ? theme.colors.primary : theme.colors.tabIconDefault;

  const styles = createStyles(theme);

  return (
    <Pressable
      {...pressableProps}
      style={({ pressed }) => [
        styles.button,
        {
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <View style={styles.content}>
        <View
          style={[
            styles.iconBox,
            {
              backgroundColor: focused ? `${color}33` : "transparent",
            },
          ]}
        >
          <FontAwesome size={24} color={color} name={iconName} />
        </View>
        <ThemedText variant="xs" semantic={focused ? "primary" : "muted"}>
          {label}
        </ThemedText>
      </View>
    </Pressable>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    button: {
      marginVertical: theme.spacing.sm,
    },
    content: {
      alignItems: "center",
      justifyContent: "center",
      borderRadius: theme.borderRadius.medium,
      padding: theme.spacing.xs,
    },
    iconBox: {
      alignItems: "center",
      justifyContent: "center",
      width: theme.spacing.xl + theme.spacing.md,
      height: theme.spacing.xl + theme.spacing.md,
      borderRadius: theme.borderRadius.small,
    },
  });
