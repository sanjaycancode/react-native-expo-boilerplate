import React, { useCallback, useMemo, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
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

import { Avatar } from "@/components/Avatar";
import { TaskItem } from "@/components/TaskItem";
import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

const PROFILE = {
  name: "System User",
  email: "systemuser@gmail.com",
  avatarUri: "https://i.pravatar.cc/128?img=9" as string | null,
};

function withOpacity(hexColor: string, opacity: number) {
  const alpha = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0");

  return `${hexColor}${alpha}`;
}

export default function ProfileScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const styles = useMemo(() => createStyles(theme), [theme.mode]);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  }, []);

  const MENU_SECTIONS = [
    {
      title: "Account",
      items: [
        {
          key: "device_check",
          title: "Device Check",
          icon: "phone-android",
          iconFamily: MaterialIcons,
          href: "/(tabs)/Profile/device-check",
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
          href: "/(tabs)/Profile/settings",
        },
        {
          key: "terms",
          title: "Terms and Conditions",
          icon: "file-alt",
          iconFamily: FontAwesome5,
          href: "/(tabs)/Profile/terms",
        },
      ],
    },
    {
      title: "Appearance",
      items: [
        {
          key: "appearance",
          title: "Appearance",
          icon: "color-palette-outline",
          iconFamily: Ionicons,
          href: "/Profile/appearance",
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
                onPress={() => {
                  router.push("/notification");
                }}
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.profileRow}>
          <ThemedCard style={styles.profileCard}>
            <TouchableOpacity
              accessibilityRole="button"
              activeOpacity={0.86}
              onPress={() => router.push("/(tabs)/Profile/basic-information")}
              style={styles.profileRowContent}
            >
              <Avatar
                name={PROFILE.name}
                uri={PROFILE.avatarUri}
                sizeVariant="md"
              />
              <View style={styles.profileMeta}>
                <ThemedText
                  variant="bodySmall"
                  style={styles.profileName}
                  numberOfLines={1}
                >
                  {PROFILE.name}
                </ThemedText>
                <ThemedText
                  variant="bodySmall"
                  semantic="muted"
                  numberOfLines={1}
                >
                  {PROFILE.email}
                </ThemedText>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={theme.colors.textTertiary}
              />
            </TouchableOpacity>
          </ThemedCard>
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
                return (
                  <TaskItem
                    key={item.key}
                    title={item.title}
                    meta={undefined}
                    icon={item.icon}
                    iconFamily={item.iconFamily}
                    onPress={() => {
                      if ("href" in item && item.href) router.push(item.href);
                    }}
                    showChevron
                    style={[styles.taskItemNoBorder]}
                  />
                );
              })}
            </View>
          </View>
        ))}

        <ThemedCard style={styles.logoutCard}>
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
      paddingHorizontal: 2,
    },
    profileCard: {
      padding: 0,
      borderWidth: 0,
      backgroundColor: theme.colors.surface,
    },
    profileRowContent: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.md,
      gap: theme.spacing.md - 4,
    },
    profileMeta: {
      flex: 1,
      gap: 2,
    },
    profileName: {
      fontFamily: theme.typography.heading3.fontFamily,
      fontWeight: theme.typography.heading3.fontWeight,
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
    taskItemNoBorder: {
      borderWidth: 0,
    },
    logoutRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: theme.spacing.sm + 2,
      paddingHorizontal: theme.spacing.md,
      backgroundColor: "transparent",
      gap: theme.spacing.sm,
    },
    logoutText: {
      color: theme.colors.error,
    },
    logoutCard: {
      padding: 0,
      overflow: "hidden",
      borderWidth: 0,
      backgroundColor: withOpacity(theme.colors.error, 0.12),
      borderRadius: theme.borderRadius.large,
    },
  });
