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
                  variant="bodySmall"
                  semantic={isSelected ? "default" : "muted"}
                  lightColor={
                    isSelected ? theme.colors.textOnPrimary : undefined
                  }
                  darkColor={
                    isSelected ? theme.colors.textOnPrimary : undefined
                  }
                >
                  {getLabel(tab)}
                </ThemedText>
                {metaLabel ? (
                  <ThemedText
                    variant="caption"
                    semantic={isSelected ? "default" : "muted"}
                    lightColor={
                      isSelected ? theme.colors.textOnPrimary : undefined
                    }
                    darkColor={
                      isSelected ? theme.colors.textOnPrimary : undefined
                    }
                  >
                    {metaLabel}
                  </ThemedText>
                ) : null}
              </View>
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
      gap: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.xs,
    },
    tab: {
      alignItems: "center",
      backgroundColor: theme.colors.backgroundAlt,
      borderRadius: theme.borderRadius.large,
      justifyContent: "center",
      minHeight: 38,
      minWidth: theme.spacing.xl * 2 + theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
    },
    selectedTab: {
      backgroundColor: theme.colors.primary,
    },
    pressedTab: {
      opacity: 0.78,
    },
    labelRow: {
      alignItems: "center",
      flexDirection: "row",
      gap: theme.spacing.xs,
    },
  });
