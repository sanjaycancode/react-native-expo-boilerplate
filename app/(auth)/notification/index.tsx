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

import { useTheme } from "@/context/ThemeContext";

export default function NotificationScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

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
            refreshing={refreshing}
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

        {filtered.map((item) => (
          <View key={item.id} style={styles.itemWrap}>
            <Link href={`/notification/${item.id}/detail`} asChild>
              <TouchableOpacity activeOpacity={0.86} style={styles.itemCard}>
                <IconBadge
                  name={item.iconName}
                  size={18}
                  color={theme.colors.primary}
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
                    {item.timeAgo}
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
        ))}
      </ScrollView>
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      gap: 12,
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
  });
