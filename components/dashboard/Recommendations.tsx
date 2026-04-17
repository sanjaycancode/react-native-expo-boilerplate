import React, { useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";

import { ThemedText } from "@/components/ThemedText";

import { useThemeColors } from "@/context/ThemeContext";

type ColorKey = "warning" | "accent" | "success";

interface Recommendation {
  icon: React.ComponentProps<typeof FontAwesome>["name"];
  title: string;
  description: string;
  tag: string;
  colorKey: ColorKey;
}

const recommendations: Recommendation[] = [
  {
    icon: "lightbulb-o",
    title: "Improve Writing Task 2",
    description: "Focus on essay structure and coherence to boost your band score.",
    tag: "Writing",
    colorKey: "warning",
  },
  {
    icon: "volume-up",
    title: "Listening Section 4 Practice",
    description: "Academic lectures are your weakest area. Try targeted drills.",
    tag: "Listening",
    colorKey: "accent",
  },
  {
    icon: "comments-o",
    title: "Speaking Part 3 Fluency",
    description: "Practice abstract topic discussions to improve response depth.",
    tag: "Speaking",
    colorKey: "success",
  },
];

function RecommendationCard({ item }: { item: Recommendation }) {
  const colors = useThemeColors();

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        card: {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      }),
    [colors],
  );

  const resolvedColor = colors[item.colorKey];

  return (
    <Pressable
      style={[styles.card, dynamicStyles.card]}
      onPress={() => {}}
    >
      <View style={styles.cardContent}>
        <View style={styles.iconRow}>
          <FontAwesome name={item.icon} size={16} color={colors.primary} />
          <View style={[styles.tag, { backgroundColor: `${resolvedColor}15` }]}>
            <ThemedText variant="caption" style={{ color: resolvedColor, fontSize: 10 }}>
              {item.tag}
            </ThemedText>
          </View>
        </View>
        <View style={styles.textContent}>
          <ThemedText variant="bodySmall" style={{ fontWeight: "600" }}>
            {item.title}
          </ThemedText>
          <ThemedText variant="caption" semantic="muted">
            {item.description}
          </ThemedText>
        </View>
      </View>
      <FontAwesome name="chevron-right" size={14} color={colors.textTertiary} />
    </Pressable>
  );
}

export function Recommendations() {
  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <ThemedText variant="body" style={{ fontWeight: "600" }}>
          Recommended For You
        </ThemedText>
        <Pressable onPress={() => {}}>
          <ThemedText variant="bodySmall" semantic="primary">
            See All
          </ThemedText>
        </Pressable>
      </View>
      <View style={styles.list}>
        {recommendations.map((item) => (
          <RecommendationCard key={item.title} item={item} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  list: {
    gap: 8,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    gap: 8,
  },
  cardContent: {
    flex: 1,
    gap: 8,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  textContent: {
    gap: 2,
  },
});
