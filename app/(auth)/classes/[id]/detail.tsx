import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";

import { Stack, useLocalSearchParams } from "expo-router";

import FontAwesome from "@expo/vector-icons/FontAwesome";

import { StatusBadge } from "@/components/classes/StatusBadgeClass";
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
        <Stack.Screen options={{ title: "Class not found" }} />
        <ScrollView style={styles.container}>
          <View style={styles.content}>
            <ThemedText variant="heading5" semantic="default">
              Class not found
            </ThemedText>
            <ThemedText semantic="muted">
              The requested class does not exist or is no longer available.
            </ThemedText>
          </View>
        </ScrollView>
      </>
    );
  }

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
            <StatusBadge label={classData.family} type="family" />
            <StatusBadge label={classData.variant} type="variant" />
            <StatusBadge label={classData.price} type="price" />
          </View>

          <ThemedText variant="heading5" semantic="default">
            {classData.title}
          </ThemedText>
          <ThemedText variant="body" semantic="muted">
            {classData.subtitle}
          </ThemedText>


          <AboutCard
            description={classData.description}
            title="About This Class"
          />
          

          <View style={styles.infoGrid}>
            <ThemedCard variant="outlined" style={styles.infoCard}>
              <View style={styles.infoLabelRow}>
                <FontAwesome name="calendar" size={16} color={colors.primary} />
                <ThemedText variant="caption" semantic="muted">
                  Date
                </ThemedText>
              </View>
              <ThemedText variant="bodySmall" semantic="default" style={styles.infoValue}>
                {classData.date}
              </ThemedText>
            </ThemedCard>
            <ThemedCard variant="outlined" style={styles.infoCard}>
              <View style={styles.infoLabelRow}>
                <FontAwesome name="clock-o" size={16} color={colors.primary} />
                <ThemedText variant="caption" semantic="muted">
                  Time
                </ThemedText>
              </View>
              <ThemedText variant="bodySmall" semantic="default" style={styles.infoValue}>
                {classData.time}
              </ThemedText>
            </ThemedCard>
            <ThemedCard variant="outlined" style={styles.infoCard}>
              <View style={styles.infoLabelRow}>
                <FontAwesome name="hourglass-half" size={16} color={colors.primary} />
                <ThemedText variant="caption" semantic="muted">
                  Duration
                </ThemedText>
              </View>
              <ThemedText variant="bodySmall" semantic="default" style={styles.infoValue}>
                {classData.duration}
              </ThemedText>
            </ThemedCard>
            <ThemedCard variant="outlined" style={styles.infoCard}>
              <View style={styles.infoLabelRow}>
                <FontAwesome name="dollar" size={16} color={colors.primary} />
                <ThemedText variant="caption" semantic="muted">
                  Price
                </ThemedText>
              </View>
              <ThemedText variant="bodySmall" semantic="default" style={styles.infoValue}>
                {classData.price}
              </ThemedText>
            </ThemedCard>
          </View>

          
            <ThemedButton
              title="Join Class"
              onPress={() => {}}
              size="medium"
            />
          
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
      padding: Spacing.md,
      gap: Spacing.md,
      paddingBottom: Spacing.xl + Spacing.sm,
    },
    badgeRow: {
      flexDirection: "row",
      gap: Spacing.sm,
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
    infoLabelRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.sm,
    },
    infoValue: {
      marginLeft: 16 + Spacing.sm,
    },
   
  });