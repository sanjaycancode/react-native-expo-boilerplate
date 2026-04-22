import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { Stack, router } from "expo-router";

import { ClassCard } from "@/components/classes/ClassCard";
import { HeaderBackButton } from "@/components/HeaderBackButton";
import { ThemedSearchBar } from "@/components/ThemedSearchBar";
import { ThemedText } from "@/components/ThemedText";
import { BorderRadius, Spacing } from "@/constants/Themes";
import { useThemeColors } from "@/context/ThemeContext";
import { CLASSES } from "@/data/classes";

export default function ClassesScreen() {
  const styles = createStyles();
  const colors = useThemeColors();
  const [searchText, setSearchText] = useState("");

  const filteredClasses = CLASSES.filter((cls) =>
    cls.title.toLowerCase().includes(searchText.toLowerCase())
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
              Access live classes and replays from your mentors. Learn from experts and practice in real-time sessions.
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

const createStyles = () =>
  StyleSheet.create({
    scrollContent: {
      padding: Spacing.md,
      paddingBottom: Spacing.xl + Spacing.sm,
    },
    header: {
      gap: Spacing.md,
      marginBottom: Spacing.md,
    },
    searchRow: {
      alignItems: "center",
    },
    infoBox: {
      borderWidth: 1,
      borderRadius: BorderRadius.large,
      padding: Spacing.md,
    },
    separator: {
      height: Spacing.md,
    },
  });