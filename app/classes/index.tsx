import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { Stack, router } from "expo-router";

import { ClassCard } from "@/components/classes/ClassCard";
import { HeaderBackButton } from "@/components/HeaderBackButton";
import { ThemedSearchBar } from "@/components/ThemedSearchBar";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/context/ThemeContext";
import { CLASSES } from "@/data/classes";

export default function ClassesScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [searchText, setSearchText] = useState("");

  const filteredClasses = CLASSES.filter((cls) =>
    cls.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "Classes",
          headerBackTitle: "Learn",
          headerLeft: HeaderBackButton,
        }}
      />

      <FlatList
        data={filteredClasses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ClassCard
            family={item.family}
            variant={item.variant}
            title={item.title}
            date={item.date}
            time={item.time}
            image={item.image}
            onPress={() => router.push(`/classes/${item.id}/detail`)}
          />
        )}
        contentContainerStyle={styles.scrollContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.searchRow}>
              <ThemedSearchBar
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Search classes..."
              />
            </View>
            <ThemedText variant="body" semantic="muted">
              Access live classes and replays from your mentors. Learn from
              experts and practice in real-time sessions.
            </ThemedText>
          </View>
        }
        ListEmptyComponent={
          <ThemedText variant="body" semantic="muted">
            No classes found matching "{searchText}"
          </ThemedText>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    scrollContent: {
      padding: theme.spacing.md,
      paddingBottom: theme.spacing.xl + theme.spacing.sm,
    },
    header: {
      gap: theme.spacing.md,
      marginBottom: theme.spacing.md,
    },
    searchRow: {
      alignItems: "center",
    },
    infoBox: {
      borderWidth: 1,
      borderRadius: theme.borderRadius.large,
      padding: theme.spacing.md,
    },
    separator: {
      height: theme.spacing.md,
    },
  });
