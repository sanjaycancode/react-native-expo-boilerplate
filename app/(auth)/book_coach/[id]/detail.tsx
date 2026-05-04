import { useMemo, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { Stack, useLocalSearchParams } from "expo-router";

import { IconBadge } from "@/components/IconBadge";
import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { useTheme, useThemeColors } from "@/context/ThemeContext";

import { useTeacherOfferingsQuery } from "@/hooks/api";

type AppTheme = ReturnType<typeof useTheme>["theme"];

function formatPrice(value: string | number | null | undefined): string {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed.toFixed(2) : "0.00";
}

function formatAmount(value: unknown): string | null {
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  if (
    typeof value === "string" &&
    value.trim() !== "" &&
    Number.isFinite(Number(value))
  ) {
    return String(Number(value));
  }
  return null;
}

function formatCurrency(code: string | null | undefined): "$" | "€" | "£" | "" {
  const normalized = (code ?? "").trim().toLowerCase();
  if (normalized === "usd") return "$";
  if (normalized === "eur") return "€";
  if (normalized === "gbp") return "£";
  return "";
}

type Params = {
  id?: string;
  name?: string;
  title?: string;
};

export default function CoachDetail() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const colors = useThemeColors();
  const { id, name, title } = useLocalSearchParams<Params>();
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const [bioTextWidth, setBioTextWidth] = useState<number>(0);
  const [bioLineCount, setBioLineCount] = useState<number>(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    data: offerings = [],
    isPending: isOfferingsPending,
    isError: isOfferingsError,
    refetch: refetchOfferings,
  } = useTeacherOfferingsQuery(id);

  const initials = useMemo(() => {
    const displayName = name?.trim() ?? "";
    const parts = displayName.split(/\s+/).filter(Boolean);
    const computed = parts
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("");
    return computed || displayName[0]?.toUpperCase() || "?";
  }, [name]);

  return (
    <>
      <Stack.Screen options={{ title: "Coach Details" }} />
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={async () => {
              setIsRefreshing(true);
              try {
                await refetchOfferings();
              } finally {
                setIsRefreshing(false);
              }
            }}
          />
        }
      >
        <ThemedCard style={styles.profileCard}>
          <View style={styles.profileTopRow}>
            <View
              style={[
                styles.avatar,
                { backgroundColor: colors.overlay, borderColor: colors.border },
              ]}
            >
              <ThemedText variant="bodySmall">{initials}</ThemedText>
            </View>

            <View style={styles.profileMain}>
              <ThemedText variant="heading2">{name ?? "Coach"}</ThemedText>
            </View>
          </View>
        </ThemedCard>

        <View style={styles.section}>
          <ThemedText variant="heading3">About Coach</ThemedText>
          <ThemedText variant="bodySmall" semantic="muted">
            Details about the coach.
          </ThemedText>
        </View>

        <ThemedCard variant="outlined" style={styles.detailsCard}>
          {title ? (
            <View
              style={styles.bioBlock}
              onLayout={(e) => setBioTextWidth(e.nativeEvent.layout.width)}
            >
              {bioTextWidth > 0 ? (
                <ThemedText
                  variant="bodySmall"
                  semantic="muted"
                  style={[styles.bioMeasureText, { width: bioTextWidth }]}
                  onTextLayout={(e) => {
                    const nextCount = e.nativeEvent.lines.length;
                    setBioLineCount((prev) =>
                      prev === nextCount ? prev : nextCount,
                    );
                  }}
                >
                  {title}
                </ThemedText>
              ) : null}

              <ThemedText
                  variant="bodySmall"
                  semantic="muted"
                  numberOfLines={isBioExpanded ? undefined : 4}
                >
                  {title}
                </ThemedText>

              {bioLineCount > 4 ? (
                <TouchableOpacity
                  accessibilityRole="button"
                  activeOpacity={0.8}
                  onPress={() => setIsBioExpanded((v) => !v)}
                  style={styles.seeMoreButton}
                >
                  <ThemedText variant="bodySmall" semantic="primary">
                    {isBioExpanded ? "See less" : "See more"}
                  </ThemedText>
                </TouchableOpacity>
              ) : null}
            </View>
          ) : null}
        </ThemedCard>

        <View style={styles.section}>
          <ThemedText variant="heading3">Offerings</ThemedText>
          <ThemedText variant="bodySmall" semantic="muted">
            Choose a session that fits your goals.
          </ThemedText>
        </View>

        

        <View style={styles.offerings}>
          {isOfferingsPending ? (
            <ThemedText variant="bodySmall" semantic="muted">
              Loading offerings...
            </ThemedText>
          ) : isOfferingsError ? (
            <TouchableOpacity
              accessibilityRole="button"
              activeOpacity={0.8}
              onPress={() => refetchOfferings()}
            >
              <ThemedText variant="bodySmall">
                Failed to load offerings. Tap to retry.
              </ThemedText>
            </TouchableOpacity>
          ) : offerings.length === 0 ? (
            <ThemedText variant="bodySmall" semantic="muted">
              No offerings available.
            </ThemedText>
          ) : (
            offerings.map((offering, index) => {
              const currencySymbol = formatCurrency(offering.currency);
              const amountLabel = formatAmount(offering.amount);
              const priceLabel =
                amountLabel != null
                  ? `${currencySymbol}${amountLabel}`
                  : offering.price != null
                    ? `${currencySymbol}${formatPrice(offering.price)}`
                    : "—";

              return (
                <ThemedCard
                  key={String(offering.id ?? index)}
                  variant="outlined"
                  style={styles.offeringCard}
                >
                  <View style={styles.offeringTop}>
                    <ThemedText variant="heading5">
                      {offering.title ?? "Session"}
                    </ThemedText>

                    <View style={styles.offeringMetaRow}>
                      <View style={styles.metaItem}>
                        <IconBadge
                          name="hourglass-outline"
                          size={18}
                          badgeSize={18}
                          backgroundColor="transparent"
                        />
                        <ThemedText variant="bodySmall" semantic="muted">
                          {typeof offering.duration_minutes === "number"
                            ? `${offering.duration_minutes} min`
                            : "—"}
                        </ThemedText>
                      </View>

                      <View style={styles.metaItem}>
                        <IconBadge
                          name="pricetags-sharp"
                          size={18}
                          badgeSize={18}
                          backgroundColor="transparent"
                        />
                        <ThemedText variant="bodySmall" semantic="muted">
                          {priceLabel}
                        </ThemedText>
                      </View>
                    </View>
                  </View>

                  {offering.description ? (
                    <ThemedText
                      variant="bodySmall"
                      semantic="muted"
                      numberOfLines={3}
                    >
                      {offering.description}
                    </ThemedText>
                  ) : null}
                </ThemedCard>
              );
            })
          )}
        </View>
      </ScrollView>
    </>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      padding: theme.spacing.lg,
      gap: theme.spacing.md,
    },
    profileCard: {
      gap: theme.spacing.md,
    },
    profileTopRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.md,
    },
    avatar: {
      width: theme.spacing.xl * 2,
      height: theme.spacing.xl * 2,
      borderRadius: theme.borderRadius.full,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
    },
    profileMain: {
      flex: 1,
      gap: theme.spacing.xs,
    },
    detailsCard: {
      gap: theme.spacing.md,
      padding: theme.spacing.md,
      paddingVertical: theme.spacing.md,
    },
    bioBlock: {
      gap: theme.spacing.xs,
    },
    bioMeasureText: {
      position: "absolute",
      opacity: 0,
    },
    seeMoreButton: {
      alignSelf: "flex-end",
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.md,
    },
    metaItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.xs,
      paddingVertical: theme.spacing.xs,
      paddingHorizontal: theme.spacing.xs,
    },
    section: {
      gap: theme.spacing.xs,
    },
    offerings: {
      gap: theme.spacing.sm,
    },
    offeringCard: {
      gap: theme.spacing.xs,
    },
    offeringTop: {
      gap: theme.spacing.xs,
    },
    offeringMetaRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: theme.spacing.md,
      alignItems: "center",
    },
  });
