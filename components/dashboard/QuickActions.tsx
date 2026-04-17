import React, { useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";

import { ThemedText } from "@/components/ThemedText";

import { useThemeColors } from "@/context/ThemeContext";

type ColorKey = "accent" | "primary" | "warning" | "success";

interface QuickAction {
  icon: React.ComponentProps<typeof FontAwesome>["name"];
  label: string;
  subtitle: string;
  colorKey: ColorKey;
}

const actions: QuickAction[] = [
  {
    icon: "pencil-square-o",
    label: "Mock Test",
    subtitle: "Full test",
    colorKey: "accent",
  },
  {
    icon: "flash",
    label: "Smart Practice",
    subtitle: "AI-driven",
    colorKey: "primary",
  },
  {
    icon: "list-alt",
    label: "Manual Practice",
    subtitle: "Choose topics",
    colorKey: "warning",
  },
  {
    icon: "bar-chart",
    label: "Analytics",
    subtitle: "View stats",
    colorKey: "success",
  },
];

function ActionCard({ action }: { action: QuickAction }) {
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

  const resolvedColor = colors[action.colorKey];

  return (
    <Pressable
      style={[styles.actionCard, dynamicStyles.card]}
      onPress={() => {}}
    >
      <View style={[styles.iconContainer, { backgroundColor: `${resolvedColor}15` }]}>
        <FontAwesome name={action.icon} size={18} color={resolvedColor} />
      </View>
      <View style={styles.textContainer}>
        <ThemedText variant="bodySmall" style={{ fontWeight: "600" }}>
          {action.label}
        </ThemedText>
        <ThemedText variant="caption" semantic="muted">
          {action.subtitle}
        </ThemedText>
      </View>
    </Pressable>
  );
}

export function QuickActions() {
  return (
    <View style={styles.container}>
      <ThemedText variant="body" style={{ fontWeight: "600" }}>
        Quick Actions
      </ThemedText>
      <View style={styles.grid}>
        {actions.map((action) => (
          <ActionCard key={action.label} action={action} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  actionCard: {
    width: "47%",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    gap: 10,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    gap: 2,
  },
});
