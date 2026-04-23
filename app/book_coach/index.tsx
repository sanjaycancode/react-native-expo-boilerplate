import { useCallback, useMemo, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { Stack, useRouter } from "expo-router";

import { CoachCard } from "@/components/CoachCard";
import { ThemedSearchBar } from "@/components/ThemedSearchBar";
import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

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
  // const colors = useThemeColors();
  const router = useRouter();

  const [query, setQuery] = useState("");

  const coaches: Coach[] = useMemo(
    () => [
      {
        id: "1",
        name: "Sophia Lee",
        title: "IELTS Speaking ● Pronunciation",
        pricePerSession: 15.75,
        nextAvailable: "Today ● 6:30 PM",
      },
      {
        id: "2",
        name: "Michael Chen",
        title: "IELTS Writing ● Structure",
        pricePerSession: 20.22,
        nextAvailable: "Mon ● 8:00 AM",
      },
      {
        id: "3",
        name: "Emily Davis",
        title: "IELTS Listening ● Strategy",
        pricePerSession: 22.80,
        nextAvailable: "Tue ● 7:15 PM",
      },
      {
        id: "4",
        name: "Daniel Kim",
        title: "IELTS Reading ● Time Management",
        pricePerSession: 17.50,
        nextAvailable: "Tue ● 7:15 PM",
      },
      {
        id: "5",
        name: "Olivia Martinez",
        title: "IELTS Interview ● Confidence",
        pricePerSession: 18.49,
        nextAvailable: "Wed ● 7:15 PM",
      },
      {
        id: "6",
        name: "Charlie Alvarez",
        title: "English Speaking ● Confidence",
        pricePerSession: 12.75,
        nextAvailable: "Sat ● 7:15 PM",
      },
      {
        id: "7",
        name: "Zoe Smith",
        title: "IELTS Speaking ● Pronunciation",
        pricePerSession: 19.745,
        nextAvailable: "Sat ● 7:15 PM",
      }
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
            <ThemedSearchBar
              value={query}
              onChangeText={setQuery}
              placeholder="Search coaches..."
            />

          </View>
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
                  name: item.name,
                  title: item.title,
                  nextAvailable: item.nextAvailable,
                  pricePerSession: String(item.pricePerSession),
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
      padding: theme.spacing.md,
      paddingHorizontal: theme.spacing.md,
    },
    headerBlock: {
      gap: theme.spacing.md,
      marginBottom: theme.spacing.md,
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
