import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

type ThemedMaterialTopTabsProps<TValue extends string> = {
  tabs: readonly TValue[];
  selectedTab: TValue;
  onSelectTab: (tab: TValue) => void;
  getLabel?: (tab: TValue) => string;
  getMetaLabel?: (tab: TValue) => string | undefined;
};

export function ThemedMaterialTopTabs<TValue extends string>({
  tabs,
  selectedTab,
  onSelectTab,
  getLabel = (tab) => tab,
  getMetaLabel,
}: ThemedMaterialTopTabsProps<TValue>) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabList}
      >
        {tabs.map((tab) => {
          const isSelected = selectedTab === tab;
          const metaLabel = getMetaLabel?.(tab);

          return (
            <Pressable
              key={tab}
              onPress={() => onSelectTab(tab)}
              style={({ pressed }) => [
                styles.tab,
                isSelected && styles.selectedTab,
                pressed && styles.pressedTab,
              ]}
            >
              <View style={styles.labelRow}>
                <ThemedText
                  variant="caption"
                  style={[styles.label, isSelected && styles.selectedLabel]}
                >
                  {getLabel(tab)}
                </ThemedText>
                {metaLabel ? (
                  <ThemedText
                    variant="caption"
                    style={[
                      styles.metaLabel,
                      isSelected && styles.selectedMetaLabel,
                    ]}
                  >
                    {metaLabel}
                  </ThemedText>
                ) : null}
              </View>
              <View
                style={[
                  styles.indicator,
                  isSelected && styles.selectedIndicator,
                ]}
              />
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      marginHorizontal: -theme.spacing.md,
    },
    tabList: {
      alignItems: "center",
      gap: theme.spacing.xs,
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.xs,
    },
    tab: {
      alignItems: "center",
      gap: theme.spacing.xs,
      minWidth: theme.spacing.xxl * 2,
      paddingHorizontal: theme.spacing.sm,
      paddingTop: theme.spacing.sm,
    },
    selectedTab: {
      backgroundColor: theme.colors.overlay,
      borderRadius: theme.borderRadius.small,
    },
    pressedTab: {
      opacity: 0.72,
    },
    labelRow: {
      alignItems: "center",
      flexDirection: "row",
      gap: theme.spacing.xs,
    },
    label: {
      color: theme.colors.textSecondary,
      fontFamily: "LexendSemiBold",
      textAlign: "center",
    },
    selectedLabel: {
      color: theme.colors.primary,
    },
    metaLabel: {
      color: theme.colors.textTertiary,
    },
    selectedMetaLabel: {
      color: theme.colors.primary,
    },
    indicator: {
      backgroundColor: "transparent",
      borderRadius: theme.borderRadius.full,
      height: 3,
      width: "100%",
    },
    selectedIndicator: {
      backgroundColor: theme.colors.primary,
    },
  });
