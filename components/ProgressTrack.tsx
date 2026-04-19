import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { useTheme } from "@/context/ThemeContext";

export type ProgressTrackProps = {
  progress: number;
  height?: number;
  fillColor?: string;
  trackColor?: string;
  style?: StyleProp<ViewStyle>;
};

export function ProgressTrack({
  progress,
  height = 6,
  fillColor,
  trackColor,
  style,
}: ProgressTrackProps) {
  const { theme } = useTheme();
  const colors = theme.colors;

  const resolvedFillColor = fillColor ?? colors.accent;
  const resolvedTrackColor = trackColor ?? colors.overlay;

  return (
    <View
      style={[
        styles.track,
        {
          backgroundColor: resolvedTrackColor,
          borderRadius: height / 2,
          height,
        },
        style,
      ]}
    >
      <View
        style={[
          styles.fill,
          {
            backgroundColor: resolvedFillColor,
            borderRadius: height / 2,
            width: `${progress}%`,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    overflow: "hidden",
  },
  fill: {
    height: "100%",
  },
});
