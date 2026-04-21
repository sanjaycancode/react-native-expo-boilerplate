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

import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

export default function NotificationScreen() {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme.mode]);

  type TabKey = "all" | "unread" | "booking" | "result";
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [refreshing, setRefreshing] = useState(false);

  type NotificationRow = {
    id: string;
    title: string;
    description: string;
    timeAgo: string;
    iconName: React.ComponentProps<typeof Ionicons>["name"];
    tab: Exclude<TabKey, "all">;
    unread?: boolean;
  };

  const notifications = useMemo<NotificationRow[]>(() => {
    const base: NotificationRow[] = [
      {
        id: "1",
        title: "Almost Gone",
        description:
          "Limited-time offer! Enjoy up to 40% off on selected furniture. Don't miss out! shop now before it's too late!",
        timeAgo: "2h ago",
        iconName: "time-outline",
        tab: "unread",
        unread: true,
      },
      {
        id: "2",
        title: "Limited Offer! Claim $50.00 voucher",
        description:
          "Sign up now and enjoy a $50.00 voucher on your first purchase! Don't miss out.",
        timeAgo: "2h ago",
        iconName: "gift-outline",
        tab: "result",
      },
      {
        id: "3",
        title: "Unlock Your Exclusive Gift",
        description:
          "Sign up now and enjoy a $50.00 voucher on your first purchase! Don't miss out.",
        timeAgo: "2h ago",
        iconName: "bag-handle-outline",
        tab: "booking",
      },
      {
        id: "4",
        title: "Order Confirmed",
        description:
          "We're preparing your order and will notify you once it's shipped. Track your order status anytime through the app.",
        timeAgo: "2h ago",
        iconName: "receipt-outline",
        tab: "booking",
      },
      {
        id: "5",
        title: "Order Shipped",
        description:
          "Great news! Your order has been shipped and is on its way to you. Expected delivery by 3 days.",
        timeAgo: "2h ago",
        iconName: "cube-outline",
        tab: "booking",
      },
      {
        id: "6",
        title: "Payment Received",
        description:
          "Great news! The payment for your recent sale has been successfully processed. You can now check your balance.",
        timeAgo: "2h ago",
        iconName: "wallet-outline",
        tab: "result",
      },
    ];

    return base;
  }, []);

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
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 700);
  }, []);

  const tabs = useMemo(
    () =>
      [
        { key: "all" as const, label: "All" },
        { key: "unread" as const, label: "Unread", count: unreadCount },
        { key: "booking" as const, label: "Booking", count: bookingCount },
        { key: "result" as const, label: "Results" },
      ] as const,
    [bookingCount, unreadCount],
  );

  return (
    <View style={styles.screen}>
      <Stack.Screen
        options={{
          title: "Notification",
          headerShown: true,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
          />
        }
      >
        <View style={styles.tabsRow}>
          {tabs.map((tab) => {
            const selected = activeTab === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                accessibilityRole="button"
                onPress={() => setActiveTab(tab.key)}
                style={[styles.tab, selected && styles.tabSelected]}
                activeOpacity={0.82}
              >
                <View style={styles.tabLabelRow}>
                  <ThemedText
                    variant="caption"
                    style={[
                      styles.tabLabel,
                      {
                        color: selected
                          ? theme.colors.primary
                          : theme.colors.textSecondary,
                      },
                    ]}
                  >
                    {tab.label}
                  </ThemedText>

                  {"count" in tab && tab.count > 0 ? (
                    <View
                      style={[
                        styles.tabBadge,
                        {
                          backgroundColor: theme.colors.overlay,
                          borderColor: theme.colors.primary,
                        },
                      ]}
                    >
                      <ThemedText
                        variant="caption"
                        style={[
                          styles.tabBadgeText,
                          { color: theme.colors.primary },
                        ]}
                        numberOfLines={1}
                      >
                        {tab.count > 99 ? "99+" : `${tab.count}`}
                      </ThemedText>
                    </View>
                  ) : null}
                </View>
                <View
                  style={[
                    styles.tabUnderline,
                    {
                      opacity: selected ? 1 : 0,
                      backgroundColor: theme.colors.primary,
                    },
                  ]}
                />
              </TouchableOpacity>
            );
          })}
        </View>

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

        {filtered.map((item) => (
          <View key={item.id} style={styles.itemWrap}>
            <Link href={`/notification/${item.id}/detail`} asChild>
              <TouchableOpacity activeOpacity={0.86} style={styles.itemCard}>
                <View style={styles.iconBox}>
                  <Ionicons
                    name={item.iconName}
                    size={18}
                    color={theme.colors.primary}
                  />
                </View>

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
                    {item.timeAgo}
                  </ThemedText>
                </View>

                <View style={styles.itemRight}>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={theme.colors.textSecondary}
                  />
                </View>
              </TouchableOpacity>
            </Link>
          </View>
        ))}
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
    tabsRow: {
      flexDirection: "row",
      paddingHorizontal: theme.spacing.md,
      justifyContent: "center",
      alignItems: "flex-end",
      gap: theme.spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    tab: {
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.sm,
      alignItems: "center",
      justifyContent: "center",
    },
    tabSelected: {},
    tabLabelRow: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: theme.spacing.xs + 2,
    },
    tabLabel: {
      fontWeight: theme.typography.button.fontWeight,
    },
    tabBadge: {
      minWidth: 18,
      height: 18,
      paddingHorizontal: theme.spacing.sm,
      borderRadius: theme.borderRadius.full,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      marginTop: -15,
      marginStart: -5,
    },
    tabBadgeText: {
      fontWeight: theme.typography.button.fontWeight,
      lineHeight: 16,
    },
    tabUnderline: {
      height: 2,
      borderRadius: 2,
      alignSelf: "stretch",
      marginTop: theme.spacing.sm,
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
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    iconBox: {
      width: theme.spacing.xl + theme.spacing.xs,
      height: theme.spacing.xl + theme.spacing.xs,
      borderRadius: theme.borderRadius.medium,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.overlay,
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
    itemRight: {
      justifyContent: "center",
      alignItems: "flex-end",
      paddingLeft: theme.spacing.sm,
    },
  });
