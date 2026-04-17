import React, { useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";

import { ThemedText } from "@/components/ThemedText";

import { useThemeColors } from "@/context/ThemeContext";

export function HeroCard() {
  const colors = useThemeColors();

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        gradientBase: {
          backgroundColor: colors.primary,
        },
        gradientOverlay: {
          backgroundColor: colors.primaryDark,
        },
        tag: {
          backgroundColor: "rgba(255, 255, 255, 0.2)",
        },
        resumeButton: {
          backgroundColor: "rgba(255, 255, 255, 0.2)",
        },
        progressTrack: {
          backgroundColor: "rgba(255, 255, 255, 0.2)",
        },
        progressFill: {
          backgroundColor: colors.textOnPrimary,
        },
      }),
    [colors],
  );

  return (
    <Pressable style={styles.card}>
      <View style={[styles.gradientBase, dynamicStyles.gradientBase]}>
        <View style={[styles.gradientOverlay, dynamicStyles.gradientOverlay, styles.gradientShape]} />
      </View>

      <View style={styles.content}>
        <View style={styles.topRow}>
          <View style={[styles.tag, dynamicStyles.tag]}>
            <ThemedText variant="caption" style={{ color: colors.textOnPrimary }}>
              Continue Learning
            </ThemedText>
          </View>
          <FontAwesome name="headphones" size={20} color="rgba(255,255,255,0.8)" />
        </View>

        <View style={styles.mainSection}>
          <ThemedText variant="heading3" style={{ color: colors.textOnPrimary }}>
            IELTS Listening
          </ThemedText>
          <ThemedText variant="bodySmall" style={{ color: "rgba(255,255,255,0.8)" }}>
            Section 3 — Academic Discussion
          </ThemedText>
        </View>

        <View style={styles.bottomRow}>
          <View style={styles.progressSection}>
            <View style={[styles.progressTrack, dynamicStyles.progressTrack]}>
              <View style={[dynamicStyles.progressFill, { width: "65%", height: 4, borderRadius: 2 }]} />
            </View>
            <ThemedText variant="caption" style={{ color: "rgba(255,255,255,0.7)" }}>
              65% complete
            </ThemedText>
          </View>

          <View style={[styles.resumeButton, dynamicStyles.resumeButton]}>
            <FontAwesome name="play" size={12} color={colors.textOnPrimary} style={{ marginRight: 6 }} />
            <ThemedText variant="button" style={{ color: colors.textOnPrimary, fontSize: 13 }}>
              Resume
            </ThemedText>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: "hidden",
    minHeight: 170,
  },
  gradientBase: {
    ...StyleSheet.absoluteFillObject,
  },
  gradientOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "60%",
    height: "100%",
    opacity: 0.4,
    borderTopLeftRadius: 80,
  },
  gradientShape: {
    borderBottomLeftRadius: 40,
  },
  content: {
    padding: 20,
    flex: 1,
    justifyContent: "space-between",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  mainSection: {
    gap: 4,
    marginTop: 8,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 12,
  },
  progressSection: {
    flex: 1,
    gap: 6,
    marginRight: 16,
  },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    overflow: "hidden",
  },
  resumeButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
});
