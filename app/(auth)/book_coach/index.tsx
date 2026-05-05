import { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { Stack, useRouter } from "expo-router";

import { CoachCard } from "@/components/CoachCard";
import { ThemedFlatList } from "@/components/ThemedFlatList";
import { ThemedSearchBar } from "@/components/ThemedSearchBar";
import { ThemedText } from "@/components/ThemedText";

import { useTheme, useThemeColors } from "@/context/ThemeContext";

import { useCoachingTeachersQuery } from "@/hooks/api";
import type { Coach } from "@/types";

type AppTheme = ReturnType<typeof useTheme>["theme"];

function useDebouncedValue<T>(value: T, delayMs: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handle = setTimeout(() => setDebouncedValue(value), delayMs);
    return () => clearTimeout(handle);
  }, [value, delayMs]);

  return debouncedValue;
}

function getErrorMessage(error: unknown) {
  if (error && typeof error === "object" && "message" in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string" && message.trim()) return message;
  }
  return "Please try again.";
}

export default function BookCoachScreen() {
  const { theme } = useTheme();
  const colors = useThemeColors();
  const styles = createStyles(theme, colors);
  const navigation = useNavigation();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 300);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { data: teachers = [], isPending, isError, error, refetch } =
    useCoachingTeachersQuery();

  const coaches = useMemo<Coach[]>(
    () =>
      teachers.map((t, index) => ({
        id: String(t.id ?? index),
        name: t.display_name ?? "",
        title: t.bio ?? "",
      })),
    [teachers],
  );

  const filteredCoaches = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return coaches;

    return coaches.filter((c) =>
      `${c.name ?? ""} ${c.title ?? ""}`.toLowerCase().includes(q),
    );
  }, [debouncedQuery, coaches]);

  useFocusEffect(
    useCallback(() => {
      const parent = navigation.getParent();
      parent?.setOptions({ tabBarStyle: { display: "none" } });

      return () => {
        parent?.setOptions({ tabBarStyle: undefined });
      };
    }, [navigation]),
  );

  return (
    <>
      <Stack.Screen options={{ title: "Book Coach" }} />

      <View style={styles.screen}>
        <View style={styles.searchHeader}>
          <ThemedSearchBar
            value={query}
            onChangeText={setQuery}
            placeholder="Search coaches..."
          />
        </View>

        <ThemedFlatList
          data={filteredCoaches}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          isRefreshing={isRefreshing}
          onRefresh={async () => {
            setIsRefreshing(true);
            try {
              await refetch();
            } finally {
              setIsRefreshing(false);
            }
          }}
          ListHeaderComponent={
            isPending ? (
              <ThemedText variant="bodySmall" semantic="muted">
                Loading coaches...
              </ThemedText>
            ) : isError ? (
              <TouchableOpacity
                accessibilityRole="button"
                activeOpacity={0.8}
                onPress={() => refetch()}
              >
                <ThemedText variant="bodySmall">
                  Failed to load coaches. Tap to retry.
                </ThemedText>
                <ThemedText variant="bodySmall" semantic="muted">
                  {getErrorMessage(error)}
                </ThemedText>
              </TouchableOpacity>
            ) : (
              <View style={styles.listHeaderSpacer} />
            )
          }
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <TouchableOpacity
              accessibilityRole="button"
              activeOpacity={0.8}
              onPress={() =>
                router.push({
                  pathname: "/book_coach/[id]/detail",
                  params: {
                    id: item.id,
                    name: item.name ?? "",
                    title: item.title ?? "",
                    fromBookCoach: "true",
                  },
                })
              }
            >
              <CoachCard coach={item} />
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.empty}>
              <ThemedText variant="bodySmall">
                {isPending ? "Loading..." : "No results"}
              </ThemedText>
              <ThemedText variant="bodySmall" semantic="muted">
                {isPending ? "Please wait." : "Try a different search term."}
              </ThemedText>
            </View>
          }
        />
      </View>
    </>
  );
}

const createStyles = (
  theme: AppTheme,
  colors: ReturnType<typeof useThemeColors>,
) =>
  StyleSheet.create({
    screen: {
      flex: 1,
    },
    searchHeader: {
      paddingHorizontal: theme.spacing.lg,
      paddingTop: theme.spacing.lg,
      paddingBottom: theme.spacing.md,
      backgroundColor: colors.background,
    },
    container: {
      padding: theme.spacing.lg,
      paddingTop: theme.spacing.sm,
    },
    listHeaderSpacer: {
      height: theme.spacing.xs,
    },
    header: {
      gap: theme.spacing.sm,
    },
    separator: {
      height: theme.spacing.md,
    },
    empty: {
      paddingTop: theme.spacing.sm,
      gap: theme.spacing.xs,
      alignItems: "center",
    },
  });
