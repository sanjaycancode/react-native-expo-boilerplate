import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";

import { Stack, useLocalSearchParams } from "expo-router";

import { AboutCard } from "@/components/courses/AboutCard";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";
import { BorderRadius, Spacing } from "@/constants/Themes";
import { useThemeColors } from "@/context/ThemeContext";
import { CLASSES } from "@/data/classes";

export default function ClassDetail() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const colors = useThemeColors();
  const styles = createStyles();


  const classData = CLASSES.find((cls) => cls.id === id);

  if (!classData) {
    return (
      <>
        <Stack.Screen options={{ title: "Not Found" }} />
        <View style={styles.container}>
          <ThemedText variant="body" semantic="muted">
            Class not found.
          </ThemedText>
        </View>
      </>
    );
  }

  const isFree = classData.price.toLowerCase() === "free";

  return (
    <>
      <Stack.Screen options={{ title: classData.title }} />
      <ScrollView style={styles.container}>
        <Image
          source={{ uri: classData.image }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.content}>
          <View style={styles.badgeRow}>
            <View
              style={[
                styles.badge,
                { backgroundColor: colors.accent },
              ]}
            >
              <ThemedText variant="caption" style={styles.badgeText}>
                {classData.family}
              </ThemedText>
            </View>
            <View
              style={[
                styles.badge,
                { backgroundColor: colors.primary },
              ]}
            >
              <ThemedText variant="caption" style={styles.badgeText}>
                {classData.variant}
              </ThemedText>
            </View>
            <View
              style={[
                styles.badge,
                {
                  backgroundColor: isFree
                    ? colors.success
                    : colors.warning,
                },
              ]}
            >
              <ThemedText variant="caption" style={styles.badgeText}>
                {classData.price}
              </ThemedText>
            </View>
          </View>

          <ThemedText variant="heading2" semantic="default">
            {classData.title}
          </ThemedText>
          <ThemedText variant="body" semantic="muted">
            {classData.subtitle}
          </ThemedText>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <AboutCard
            description={classData.description}
            title="About This Class"
          />

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <View style={styles.infoGrid}>
            <ThemedCard variant="outlined" style={styles.infoCard}>
              <ThemedText variant="caption" semantic="muted">
                Date
              </ThemedText>
              <ThemedText variant="bodySmall" semantic="default">
                {classData.date}
              </ThemedText>
            </ThemedCard>
            <ThemedCard variant="outlined" style={styles.infoCard}>
              <ThemedText variant="caption" semantic="muted">
                Time
              </ThemedText>
              <ThemedText variant="bodySmall" semantic="default">
                {classData.time}
              </ThemedText>
            </ThemedCard>
            <ThemedCard variant="outlined" style={styles.infoCard}>
              <ThemedText variant="caption" semantic="muted">
                Duration
              </ThemedText>
              <ThemedText variant="bodySmall" semantic="default">
                {classData.duration}
              </ThemedText>
            </ThemedCard>
            <ThemedCard variant="outlined" style={styles.infoCard}>
              <ThemedText variant="caption" semantic="muted">
                Price
              </ThemedText>
              <ThemedText variant="bodySmall" semantic="default">
                {classData.price}
              </ThemedText>
            </ThemedCard>
          </View>

          <View style={styles.buttonRow}>
            <ThemedButton
              title="Join Class"
              onPress={() => {}}
              size="large"
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const createStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      width: "100%",
      height: 220,
    },
    content: {
      padding: Spacing.lg,
      gap: Spacing.lg,
      paddingBottom: Spacing.xl + Spacing.sm,
    },
    badgeRow: {
      flexDirection: "row",
      gap: Spacing.sm,
    },
    badge: {
      paddingHorizontal: Spacing.sm + Spacing.xs,
      paddingVertical: Spacing.xs,
      borderRadius: BorderRadius.medium,
    },
    badgeText: {
      color: "#fff",
    },
    divider: {
      height: 1,
    },
    infoGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: Spacing.md - Spacing.xs,
      alignSelf: "center",
      width: "100%",
    },
    infoCard: {
      flex: 1,
      minWidth: "45%",
      gap: Spacing.xs,
      borderRadius: BorderRadius.large,
    },
     buttonRow: {
      alignSelf: "center",
      width: "100%",
    },
  });