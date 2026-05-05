import React from "react";
import { StyleSheet, View } from "react-native";

import { useVideoPlayer, VideoView } from "expo-video";

import { useTheme } from "@/context/ThemeContext";

interface LessonVideoPlayerProps {
  videoUrl: string;
  durationMinutes: number;
}

export function LessonVideoPlayer({ videoUrl, durationMinutes }: LessonVideoPlayerProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const player = useVideoPlayer(videoUrl, (p) => {
    p.loop = false;
  });

  return (
    <View style={styles.container}>
      <VideoView
        player={player}
        style={styles.video}
        nativeControls
        contentFit="cover"
        surfaceType="textureView"
      />
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    container: {
      width: "100%",
      height: 220,
      borderRadius: theme.borderRadius.large,
      overflow: "hidden",
      backgroundColor: "#000",
    },
    video: {
      width: "100%",
      height: "100%",
    },
  });