import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";

import { useTheme, useThemeColors } from "@/context/ThemeContext";

interface LessonVideoPlayerProps {
  durationMinutes: number;
}

export function LessonVideoPlayer({ durationMinutes }: LessonVideoPlayerProps) {
  const { theme } = useTheme();
  const colors = useThemeColors();
  const styles = createStyles(theme);

  return (
    <View style={[styles.container, { backgroundColor: colors.text }]}>
      <Pressable style={styles.playButton}>
        <FontAwesome name="play" size={48} color={colors.textOnPrimary} />
      </Pressable>
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    container: {
      width: "100%",
      height: 220,
      borderRadius: theme.borderRadius.large,
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    },
    playButton: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: "rgba(255,255,255,0.2)",
      justifyContent: "center",
      alignItems: "center",
    },
  });