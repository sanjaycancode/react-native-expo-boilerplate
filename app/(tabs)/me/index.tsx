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

import { TaskItem } from "@/components/TaskItem";
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
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Profile",
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
            <ThemedText
              variant="caption"
              semantic="muted"
              style={styles.sectionTitle}
            >
              {section.title}
            </ThemedText>
            <View style={styles.sectionList}>
              {section.items.map((item) => {
                const isSwitch =
                  "isSwitch" in item && item.isSwitch && "switchValue" in item;

                return (
                  <TaskItem
                    key={item.key}
                    title={item.title}
                    meta={undefined}
                    icon={item.icon}
                    iconFamily={item.iconFamily}
                    onPress={() => {
                      if ("onPress" in item && item.onPress) item.onPress();
                      if ("href" in item && item.href) router.push(item.href);
                    }}
                    showChevron={!isSwitch}
                    rightAccessory={
                      isSwitch ? (
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
                      ) : undefined
                    }
                    style={[isSwitch && styles.modeRow]}
                  />
                );
              })}
            </View>
          </View>
        ))}

        <ThemedCard variant="outlined" style={styles.listCard}>
          <TouchableOpacity
            onPress={() => {}}
            style={[styles.menuRow, styles.logoutRow]}
            activeOpacity={0.85}
          >
            <Ionicons
              name="log-out-outline"
              size={20}
              color={theme.colors.error}
            />
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
    container: {
      flex: 1,
      gap: theme.spacing.sm + 2,
      paddingHorizontal: theme.spacing.md,
      backgroundColor: theme.colors.background,
    },
    content: {
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
    sectionList: {
      gap: theme.spacing.sm,
    },
    modeRow: {
      borderTopWidth: 1,
      borderColor: theme.colors.border,
    },
    logoutRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: theme.spacing.sm + 2,
      paddingHorizontal: theme.spacing.md,
      backgroundColor: theme.colors.backgroundAlt,
      gap: theme.spacing.sm,
    },
    logoutText: {
      color: theme.colors.error,
    },
  });
