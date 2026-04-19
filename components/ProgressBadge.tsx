import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

export type ProgressBadgeProps = {
  progress: number;
  size?: number;
  borderWidth?: number;
  activeColor?: string;
  trackColor?: string;
  textColor?: string;
  style?: StyleProp<ViewStyle>;
};

function getProgressRingStyle(
  progress: number,
  activeColor: string,
  trackColor: string,
) {
  return {
    borderBottomColor: progress >= 63 ? activeColor : trackColor,
    borderLeftColor: progress >= 88 ? activeColor : trackColor,
    borderRightColor: progress >= 38 ? activeColor : trackColor,
    borderTopColor: progress >= 12 ? activeColor : trackColor,
  };
}

export function ProgressBadge({
  progress,
  size = 48,
  borderWidth = 3,
  activeColor,
  trackColor,
  textColor,
  style,
}: ProgressBadgeProps) {
  const { theme } = useTheme();
  const colors = theme.colors;

  const resolvedActiveColor = activeColor ?? colors.primary;
  const resolvedTrackColor = trackColor ?? colors.primaryLight;
  const resolvedTextColor = textColor ?? colors.primary;

  return (
    <View
      style={[
        styles.badge,
        {
          borderRadius: size / 2,
          borderWidth,
          height: size,
          width: size,
        },
        getProgressRingStyle(progress, resolvedActiveColor, resolvedTrackColor),
        style,
      ]}
    >
      <ThemedText
        variant="caption"
        semantic={textColor ? "default" : "primary"}
        style={textColor ? { color: resolvedTextColor } : undefined}
      >
        {progress}%
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: "center",
    justifyContent: "center",
  },
});
