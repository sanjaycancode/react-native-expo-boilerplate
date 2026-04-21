import { useCallback, useMemo, useState } from "react";
import { FlatList, StyleSheet, TextInput, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { Stack, useRouter } from "expo-router";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import { CoachCard } from "@/components/CoachCard";
import { ThemedText } from "@/components/ThemedText";

import { useTheme, useThemeColors } from "@/context/ThemeContext";

import { BorderRadius, Spacing } from "@/constants/Themes";

type AppTheme = ReturnType<typeof useTheme>["theme"];

type Coach = {
  id: string;
  name: string;
  title: string;
  pricePerSession: number;
  nextAvailable: string;
};

export default function BookCoachScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation();
  const colors = useThemeColors();
  const router = useRouter();

  const [query, setQuery] = useState("");

  const coaches: Coach[] = useMemo(
    () => [
      {
        id: "1",
        name: "Sophia Lee",
        title: "IELTS Speaking ● Pronunciation",
        pricePerSession: 15,
        nextAvailable: "Today ● 6:30 PM",
      },
      {
        id: "2",
        name: "Michael Chen",
        title: "IELTS Writing ● Structure",
        pricePerSession: 20,
        nextAvailable: "Mon ● 8:00 AM",
      },
      {
        id: "3",
        name: "Emily Davis",
        title: "IELTS Listening ● Strategy",
        pricePerSession: 22,
        nextAvailable: "Tue ● 7:15 PM",
      },
      {
        id: "4",
        name: "Daniel Kim",
        title: "IELTS Reading ● Time Management",
        pricePerSession: 17,
        nextAvailable: "Tue ● 7:15 PM",
      },
      {
        id: "5",
        name: "Olivia Martinez",
        title: "IELTS Interview ● Confidence",
        pricePerSession: 18,
        nextAvailable: "Wed ● 7:15 PM",
      },
    ],
    [],
  );

  const filteredCoaches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return coaches;

    return coaches.filter((c) =>
      `${c.name} ${c.title}`.toLowerCase().includes(q),
    );
  }, [query, coaches]);

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

      <FlatList
        data={filteredCoaches}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View style={styles.headerBlock}>
            <View style={styles.header}>
              <ThemedText variant="heading2">Book Coach</ThemedText>
              <ThemedText variant="body" semantic="muted">
                Browse coaches and pick an available slot.
              </ThemedText>
            </View>

            <View
              style={[
                styles.searchContainer,
                {
                  backgroundColor: colors.backgroundAlt,
                  borderColor: colors.border,
                },
              ]}
            >
              <FontAwesome5
                name="search"
                size={16}
                color={colors.textSecondary}
              />

              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search content..."
                placeholderTextColor={colors.textTertiary}
                style={[styles.searchInput, { color: colors.text }]}
              />
            </View>
          </View>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <CoachCard
            coach={item}
            onViewProfile={() =>
              router.push({
                pathname: "/bookCoach/viewProfile",
                params: {
                  id: item.id,
                  name: item.name,
                  title: item.title,
                  nextAvailable: item.nextAvailable,
                  pricePerSession: String(item.pricePerSession),
                  fromBookCoach: "true",
                },
              })
            }
            onViewSlots={() =>
              router.push({
                pathname: "/bookCoach/viewSlots",
                params: {
                  id: item.id,
                  name: item.name,
                  title: item.title,
                  nextAvailable: item.nextAvailable,
                  pricePerSession: String(item.pricePerSession),
                  fromBookCoach: "true",
                },
              })
            }
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <ThemedText variant="button">No results</ThemedText>
            <ThemedText variant="bodySmall" semantic="muted">
              Try a different search term.
            </ThemedText>
          </View>
        }
      />
    </>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      padding: theme.spacing.lg,
    },
    headerBlock: {
      gap: theme.spacing.lg,
      marginBottom: theme.spacing.lg,
    },
    header: {
      gap: theme.spacing.sm,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,
      borderWidth: 1,
      borderRadius: theme.borderRadius.medium,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
    },
    searchInput: {
      flex: 1,
      fontSize: 14,
      lineHeight: 20,
      fontFamily: "Lexend",
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

