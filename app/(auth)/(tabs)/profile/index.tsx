import React, { useCallback, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { Stack, useRouter } from "expo-router";

import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";

import { Avatar } from "@/components/Avatar";
import { TaskItem } from "@/components/TaskItem";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

const PROFILE = {
  name: "System User",
  email: "systemuser@gmail.com",
  avatarUri: null as string | null,
};

export default function ProfileScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const styles = createStyles(theme);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  }, []);
  const { signOut } = useAuth();

  const MENU_SECTIONS = [
    {
      title: "Account",
      items: [
        {
          key: "device_check",
          title: "Device Check",
          meta: "Verify device compatibility and setup",
          icon: "phone-android",
          iconFamily: MaterialIcons,
          href: "/device_check",
        },
      ],
    },
    {
      title: "Extras",
      items: [
        {
          key: "referral",
          title: "Invite Friends",
          meta: "Share the app with your friends",
          icon: "user-plus",
          iconFamily: FontAwesome,
          href: "/invite_friend",
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          key: "settings",
          title: "Settings",
          meta: "Manage notifications and preferences",
          icon: "settings",
          iconFamily: MaterialIcons,
          href: "/settings",
        },
      ],
    },
  ] as const;
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Profile",
          headerRight: () => (
            <ThemedCard>
              <TouchableOpacity
                onPress={() => {
                  router.push("/notification");
                }}
              >
                <FontAwesome name="bell" size={18} color={theme.colors.text} />
              </TouchableOpacity>
            </ThemedCard>
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
              onPress={() => router.push("/basic_information")}
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
                    meta={"meta" in item ? item.meta : undefined}
                    icon={item.icon}
                    iconFamily={item.iconFamily}
                    onPress={() => {
                      if ("href" in item && item.href) router.push(item.href);
                    }}
                    showChevron
                  />
                );
              })}
            </View>
          </View>
        ))}
        <ThemedButton
          title="Logout"
          variant="accent"
          color="danger"
          onPress={signOut}
        />
      </ScrollView>
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    container: {
      flex: 1,
      gap: theme.spacing.sm + 2,
      padding: theme.spacing.md,
    },
    content: {
      paddingTop: theme.spacing.sm,
      paddingBottom: theme.spacing.lg,
      gap: theme.spacing.lg,
    },
    headerCopy: {
      paddingHorizontal: 2,
    },
    profileRow: {
      paddingHorizontal: 2,
    },
    profileCard: {
      padding: 0,
      backgroundColor: theme.colors.surface,
    },
    profileRowContent: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.md,
      gap: theme.spacing.md,
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
    sectionList: {
      gap: theme.spacing.sm,
    },
  });
