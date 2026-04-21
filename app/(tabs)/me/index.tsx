import React, { useMemo } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";

import { Stack, useRouter } from "expo-router";

import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

const PROFILE = {
  name: "System User",
  email: "systemuser@gmail.com",
  avatarUri: "https://i.pravatar.cc/128?img=9",
};

export default function MeScreen() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const styles = useMemo(() => createStyles(theme), [theme.mode]);

  const MENU_SECTIONS = [
    {
      title: "Account",
      items: [
        {
          key: "basic_information",
          title: "Basic information",
          icon: "user",
          iconFamily: FontAwesome,
          href: "/(tabs)/me/basic-information",
        },
        {
          key: "device_check",
          title: "Device Check",
          icon: "phone-android",
          iconFamily: MaterialIcons,
          href: "/(tabs)/me/device-check",
        },
        {
          key: "notification",
          title: "Notification",
          icon: "bell",
          iconFamily: FontAwesome,
          href: "/notification",
        },
      ],
    },
    {
      title: "Extras",
      items: [
        {
          key: "games",
          title: "Games",
          icon: "gamepad",
          iconFamily: FontAwesome,
          href: "/games",
        },
        {
          key: "referral",
          title: "Referrals",
          icon: "user-plus",
          iconFamily: FontAwesome,
          href: "/games",
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          key: "settings",
          title: "Settings",
          icon: "settings",
          iconFamily: MaterialIcons,
          href: "/(tabs)/me/settings",
        },
        {
          key: "terms",
          title: "Terms and Conditions",
          icon: "file-alt",
          iconFamily: FontAwesome5,
          href: "/(tabs)/me/terms",
        },
      ],
    },
    {
      title: "Appearance",
      items: [
        {
          key: "switch_mode",
          title: theme.mode === "dark" ? "Dark Mode" : "Light Mode",
          icon: theme.mode === "dark" ? "moon" : "sunny",
          iconFamily: Ionicons,
          onPress: toggleTheme,
          isSwitch: true,
          switchValue: theme.mode === "dark",
        },
      ],
    },
  ] as const;

  return (
    <View style={styles.screen}>
      <Stack.Screen
        options={{
          title: "",
          headerShadowVisible: false,
          headerTransparent: false,
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontFamily: theme.typography.heading3.fontFamily,
            fontWeight: theme.typography.heading3.fontWeight,
            fontSize: 26,
            color: theme.colors.text,
          },
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          contentStyle: { backgroundColor: theme.colors.background },
          headerRight: () => (
            <View style={styles.headerButtons}>
              <TouchableOpacity
                onPress={() => {}}
                style={styles.headerIconButton}
                activeOpacity={0.85}
                hitSlop={10}
              >
                <FontAwesome name="bell" size={18} color={theme.colors.text} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileRow}>
          <Image source={{ uri: PROFILE.avatarUri }} style={styles.avatar} />
          <View style={styles.profileMeta}>
            <ThemedText variant="heading3" numberOfLines={1}>
              {PROFILE.name}
            </ThemedText>
            <ThemedText variant="bodySmall" semantic="muted" numberOfLines={1}>
              {PROFILE.email}
            </ThemedText>
          </View>
        </View>

        {MENU_SECTIONS.map((section) => (
          <View key={section.title} style={styles.sectionWrap}>
            <ThemedText variant="caption" semantic="muted" style={styles.sectionTitle}>
              {section.title}
            </ThemedText>
            <ThemedCard variant="outlined" style={styles.listCard}>
              {section.items.map((item, idx) => {
                const IconComponent = item.iconFamily ?? MaterialIcons;
                const isLast = idx === section.items.length - 1;

                const handlePress = () => {
                  if ("isSwitch" in item && item.isSwitch) return;
                  if ("onPress" in item && item.onPress) return item.onPress();
                  if ("href" in item && item.href) router.push(item.href);
                };

                return (
                  <TouchableOpacity
                    key={item.key}
                    onPress={handlePress}
                    style={[
                      styles.menuRow,
                      "isSwitch" in item && item.isSwitch && styles.modeRow,
                      !isLast && styles.menuRowDivider,
                    ]}
                    disabled={"isSwitch" in item && item.isSwitch}
                    activeOpacity={
                      "isSwitch" in item && item.isSwitch ? 1 : 0.85
                    }
                  >
                    <View style={styles.menuIconWrap}>
                      <IconComponent
                        // @ts-expect-error icon names vary by family
                        name={item.icon}
                        size={22}
                        color={theme.colors.primary}
                      />
                    </View>

                    <ThemedText
                      variant="button"
                      style={styles.menuTitle}
                      numberOfLines={1}
                    >
                      {item.title}
                    </ThemedText>

                    <View style={styles.menuRight}>
                      {"isSwitch" in item && item.isSwitch ? (
                        <Switch
                          value={item.switchValue}
                          onValueChange={item.onPress}
                          trackColor={{
                            false: theme.colors.border,
                            true: theme.colors.primary,
                          }}
                          thumbColor={
                            item.switchValue
                              ? theme.colors.primaryLight
                              : theme.colors.textSecondary
                          }
                          ios_backgroundColor={theme.colors.border}
                        />
                      ) : (
                        <Ionicons
                          name="chevron-forward"
                          size={22}
                          color={theme.colors.primary}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ThemedCard>
          </View>
        ))}

        <ThemedCard variant="outlined" style={styles.listCard}>
          <TouchableOpacity
            onPress={() => {}}
            style={[styles.menuRow, styles.logoutRow]}
            activeOpacity={0.85}
          >
            <View style={styles.menuIconWrap}>
              <Ionicons
                name="log-out-outline"
                size={22}
                color={theme.colors.error}
              />
            </View>
            <ThemedText variant="button" style={styles.logoutText}>
              Log Out
            </ThemedText>
          </TouchableOpacity>
        </ThemedCard>
      </ScrollView>
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.sm,
      paddingBottom: theme.spacing.lg,
      gap: 18,
    },
    headerButtons: {
      flexDirection: "row",
      gap: theme.spacing.sm,
    },
    headerIconButton: {
      width: 44,
      height: 44,
      borderRadius: theme.borderRadius.full,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.overlay,
    },
    profileRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 2,
      paddingVertical: theme.spacing.sm + 2,
      gap: theme.spacing.md - 4,
    },
    avatar: {
      width: 54,
      height: 54,
      borderRadius: theme.borderRadius.full,
      backgroundColor: theme.colors.overlay,
    },
    profileMeta: {
      flex: 1,
      gap: 2,
    },
    sectionWrap: {
      gap: theme.spacing.xs + 2,
    },
    sectionTitle: {
      paddingHorizontal: 2,
    },
    listCard: {
      padding: 0,
      overflow: "hidden",
      borderRadius: theme.borderRadius.xl + 2,
    },
    menuRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: theme.spacing.lg - 6,
      paddingVertical: theme.spacing.lg - 6,
      backgroundColor: theme.colors.backgroundAlt,
      gap: theme.spacing.md - 2,
    },
    menuRowDivider: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    modeRow: {
      borderTopWidth: 1,
      borderColor: theme.colors.border,
    },
    menuIconWrap: {
      width: 40,
      height: 40,
      borderRadius: theme.borderRadius.large,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.overlay,
    },
    menuTitle: {
      flex: 1,
    },
    menuRight: {
      minWidth: 32,
      alignItems: "flex-end",
      justifyContent: "center",
    },
    logoutRow: {
      paddingTop: theme.spacing.lg - 4,
      paddingBottom: theme.spacing.lg - 4,
      backgroundColor: theme.colors.backgroundAlt,
    },
    logoutText: {
      flex: 1,
      color: theme.colors.error,
    },
  });
