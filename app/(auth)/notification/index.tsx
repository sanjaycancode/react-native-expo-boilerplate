import React, { useCallback, useMemo, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { Link, Stack } from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";

import { IconBadge } from "@/components/IconBadge";
import { ThemedMaterialTopTabs } from "@/components/ThemedMaterialTopTabs";
import { ThemedText } from "@/components/ThemedText";

import { notificationConfig } from "@/constants/notificationConfig";

import { useTheme } from "@/context/ThemeContext";

import type { Notification, NotificationKind } from "@/types/notification";

import { formatTimeAgo } from "@/utils";

import { useNotificationsQuery } from "@/hooks/api/useNotificationApi";

export default function NotificationScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  type TabKey = "all" | "unread" | "booking" | "result";
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const notificationsQuery = useNotificationsQuery();

  const notifications: Notification[] = notificationsQuery.data ?? [];

  const unreadCount = useMemo(
    () => notifications.filter((n) => n.unread).length,
    [notifications],
  );

  const bookingCount = useMemo(
    () => notifications.filter((n) => n.tab === "booking").length,
    [notifications],
  );

  const filtered = useMemo(() => {
    if (activeTab === "all") return notifications;
    return notifications.filter((n) => n.tab === activeTab);
  }, [notifications, activeTab]);

  const onRefresh = useCallback(() => {
    void notificationsQuery.refetch();
  }, [notificationsQuery]);

  const tabKeys = useMemo(
    () => ["all", "unread", "booking", "result"] as const,
    [],
  );

  const getTabLabel = useCallback(
    (tab: TabKey) => {
      switch (tab) {
        case "all":
          return "All";
        case "unread":
          return unreadCount > 0 ? `Unread (${unreadCount})` : "Unread";
        case "booking":
          return bookingCount > 0 ? `Booking (${bookingCount})` : "Booking";
        case "result":
          return "Results";
        default:
          return tab;
      }
    },
    [bookingCount, unreadCount],
  );

  function resolveIconColor(kind: NotificationKind) {
    const config = notificationConfig[kind];
    return theme.colors[config.colorToken];
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Notification",
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={notificationsQuery.isRefetching}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
          />
        }
      >
        <ThemedMaterialTopTabs
          tabs={tabKeys}
          selectedTab={activeTab}
          onSelectTab={setActiveTab}
          getLabel={getTabLabel}
        />

        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleWrap}>
            <Ionicons
              name="list-outline"
              size={16}
              color={theme.colors.textSecondary}
            />
            <ThemedText variant="bodySmall" style={styles.sectionTitle}>
              Recent Notifications
            </ThemedText>
          </View>
        </View>

        {!notificationsQuery.isLoading && filtered.length === 0 ? (
          <ThemedText
            variant="bodySmall"
            semantic="muted"
            style={styles.emptyText}
          >
            No notifications available right now.
          </ThemedText>
        ) : null}

        {filtered.map((item) => {
          const config = notificationConfig[item.kind];
          const iconColor = resolveIconColor(item.kind);

          return (
            <View key={item.id} style={styles.itemWrap}>
              <Link href={`/notification/${item.id}/detail`} asChild>
                <TouchableOpacity activeOpacity={0.86} style={styles.itemCard}>
                  <IconBadge
                    name={config.icon}
                    size={18}
                    color={iconColor}
                    badgeSize={theme.spacing.xl + theme.spacing.xs}
                    borderRadius={theme.borderRadius.medium}
                  />

                  <View style={styles.itemCopy}>
                    <ThemedText
                      variant="bodySmall"
                      style={styles.itemTitle}
                      numberOfLines={1}
                    >
                      {item.title}
                    </ThemedText>
                    <ThemedText
                      variant="caption"
                      style={styles.itemSubtitle}
                      numberOfLines={1}
                    >
                      {item.description}
                    </ThemedText>
                    <ThemedText variant="caption" semantic="muted">
                      {formatTimeAgo(item.timeAgo)}
                    </ThemedText>
                  </View>

                  <View>
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color={theme.colors.textSecondary}
                    />
                  </View>
                </TouchableOpacity>
              </Link>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: theme.spacing.md,
      gap: theme.spacing.md,
      backgroundColor: theme.colors.background,
    },
    sectionHeader: {
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.md,
      paddingBottom: theme.spacing.md,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: theme.spacing.md,
    },
    sectionTitleWrap: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,
    },
    sectionTitle: {
      fontWeight: theme.typography.heading3.fontWeight,
    },
    listContent: {
      paddingTop: theme.spacing.sm,
      paddingBottom: theme.spacing.xl,
    },
    itemWrap: {
      paddingHorizontal: theme.spacing.sm,
      paddingBottom: theme.spacing.sm,
    },
    itemCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.md,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.borderRadius.large,
      backgroundColor: theme.colors.surface,
    },
    itemCopy: {
      flex: 1,
      gap: 2,
    },
    itemTitle: {
      fontWeight: theme.typography.heading3.fontWeight,
    },
    itemSubtitle: {
      color: theme.colors.textSecondary,
    },
    emptyText: {
      paddingHorizontal: theme.spacing.md,
    },
  });
