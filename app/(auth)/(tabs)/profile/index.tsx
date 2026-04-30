import React, { useCallback, useState } from "react";
import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { Stack, useRouter } from "expo-router";

import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";

import { Avatar } from "@/components/Avatar";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import { TaskItem } from "@/components/TaskItem";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export default function ProfileScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isLogoutConfirmationVisible, setIsLogoutConfirmationVisible] =
    useState(false);
  const { signOut, loggedInUser, refreshSession } = useAuth();

  const styles = createStyles(theme);
  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await refreshSession();
    } finally {
      setRefreshing(false);
    }
  }, [refreshSession]);

  const PROFILE = {
    name: loggedInUser
      ? `${loggedInUser.firstName} ${loggedInUser.lastName}`.trim()
      : "User",
    email: loggedInUser?.email || "",
    avatarUri: null as string | null,
  };

  const handleLogout = useCallback(async () => {
    try {
      setIsSigningOut(true);
      const response = await signOut();

      if (response.message) {
        Alert.alert("Logout", response.message);
      }
    } catch (error) {
      Alert.alert("Logout Error", getErrorMessage(error));
    } finally {
      setIsSigningOut(false);
    }
  }, [signOut, router]);

  const openLogoutConfirmation = useCallback(() => {
    setIsLogoutConfirmationVisible(true);
  }, []);

  const closeLogoutConfirmation = useCallback(() => {
    if (!isSigningOut) {
      setIsLogoutConfirmationVisible(false);
    }
  }, [isSigningOut]);

  const confirmLogout = useCallback(async () => {
    setIsLogoutConfirmationVisible(false);
    await handleLogout();
  }, [handleLogout]);

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
          loading={isSigningOut}
          disabled={isSigningOut}
          onPress={openLogoutConfirmation}
        />
      </ScrollView>
      <ConfirmationModal
        visible={isLogoutConfirmationVisible}
        title="Log out?"
        message="You will need to sign in again to access your account."
        confirmLabel="Log out"
        cancelLabel="Cancel"
        confirmColor="danger"
        loading={isSigningOut}
        onConfirm={confirmLogout}
        onCancel={closeLogoutConfirmation}
      />
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
    refreshStatus: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: theme.spacing.sm,
    },
  });

function getErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "message" in error) {
    const { message } = error as { message?: unknown };
    if (typeof message === "string") {
      return message;
    }
  }

  return "Unable to log out.";
}
