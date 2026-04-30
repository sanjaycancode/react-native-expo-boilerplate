import { useCallback, useState } from "react";
import {
  Alert,
  Platform,
  RefreshControl,
  ScrollView,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { Stack } from "expo-router";

import { FontAwesome, Ionicons } from "@expo/vector-icons";

import { ThemedMaterialTopTabs } from "@/components/ThemedMaterialTopTabs";
import { ThemedText } from "@/components/ThemedText";
import ThemedTextInput from "@/components/ThemedTextInput";

import { useTheme } from "@/context/ThemeContext";

const inviteTabs = ["students", "lead", "earning"] as const;
type InviteTab = (typeof inviteTabs)[number];

export default function InviteFriendScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<InviteTab>("students");
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const referralCode = "3d448e8c20";
  const referralLink = `https://demo.app.englishcharlie.com/accounts/register/?ref=${referralCode}`;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 700);
  }, []);

  const handleCopy = useCallback(async () => {
    if (
      typeof navigator !== "undefined" &&
      "clipboard" in navigator &&
      typeof navigator.clipboard.writeText === "function"
    ) {
      await navigator.clipboard.writeText(referralCode);
      setCopyFeedback("Referral code copied.");
      return;
    }

    setCopyFeedback(null);

    if (Platform.OS !== "web") {
      Alert.alert(
        "Copy unavailable",
        "Clipboard support is not configured yet.",
      );
    }
  }, [referralCode]);

  const handleShare = useCallback(async () => {
    try {
      await Share.share({
        message: referralLink,
      });
    } catch {
      console.log("Share unavailable");
    }
  }, [referralLink]);

  return (
    <>
      <Stack.Screen options={{ title: "Invite Friends" }} />
      <View style={styles.container}>
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
          <View style={styles.header}>
            <ThemedText variant="heading2">Invite Friends</ThemedText>
            <ThemedText variant="body" semantic="muted">
              Share the app with your friends.
            </ThemedText>
          </View>

          <ThemedMaterialTopTabs
            tabs={inviteTabs}
            selectedTab={selectedTab}
            onSelectTab={setSelectedTab}
            getLabel={(tab) => {
              if (tab === "students") return "Students";
              if (tab === "lead") return "Lead";
              return "Earning";
            }}
          />

          <View style={styles.codeSection}>
            <ThemedText variant="heading6">Referral Code</ThemedText>
            <View style={styles.codeRow}>
              <View style={styles.codeFieldShell}>
                <View style={styles.codeInputWrapper}>
                  <ThemedTextInput
                    value={referralLink}
                    disabled
                    containerStyle={styles.codeInput}
                    style={styles.codeInputText}
                  />
                </View>
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityLabel="Copy referral code"
                  onPress={handleCopy}
                  activeOpacity={0.85}
                  style={styles.inlineCopyButton}
                >
                  <FontAwesome
                    name="copy"
                    size={16}
                    color={theme.colors.textSecondary}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel="Share referral code"
                onPress={handleShare}
                activeOpacity={0.85}
                style={styles.shareButton}
              >
                <Ionicons
                  name="share-social-outline"
                  size={18}
                  color={theme.colors.textOnPrimary}
                />
              </TouchableOpacity>
            </View>
            {copyFeedback ? (
              <ThemedText variant="caption" semantic="success">
                {copyFeedback}
              </ThemedText>
            ) : null}
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: theme.spacing.md,
      gap: theme.spacing.md,
    },
    listContent: {
      paddingTop: theme.spacing.sm,
      paddingBottom: theme.spacing.xl,
      gap: theme.spacing.md,
    },
    header: {
      gap: theme.spacing.xs,
    },
    codeSection: {
      gap: theme.spacing.sm,
    },
    codeRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,
    },
    codeFieldShell: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.large,
      backgroundColor: theme.colors.backgroundAlt,
      paddingLeft: theme.spacing.sm,
      paddingRight: theme.spacing.md,
    },
    codeInputWrapper: {
      flex: 1,
    },
    codeInput: {
      minHeight: 44,
      borderWidth: 0,
      backgroundColor: "transparent",
      paddingHorizontal: 0,
    },
    codeInputText: {
      color: theme.colors.text,
      fontSize: theme.typography.bodySmall.fontSize,
    },
    inlineCopyButton: {
      marginLeft: theme.spacing.sm,
      paddingVertical: theme.spacing.sm,
      paddingLeft: theme.spacing.sm,
    },
    shareButton: {
      width: 44,
      height: 44,
      borderRadius: theme.borderRadius.medium,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.primary,
    },
  });
