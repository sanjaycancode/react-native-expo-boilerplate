import { FlatList, StyleSheet, View } from "react-native";

import { Stack, router } from "expo-router";

import { ClassCard } from "@/components/classes/ClassCard";
import { HeaderBackButton } from "@/components/HeaderBackButton";
import { ThemedSearchBar } from "@/components/ThemedSearchBar";
import { ThemedText } from "@/components/ThemedText";
import { Spacing } from "@/constants/Themes";
import { useThemeColors } from "@/context/ThemeContext";
import { CLASSES } from "@/data/classes";

export default function ClassesScreen() {
  const styles = createStyles();
  const colors = useThemeColors();

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
        key="classGrid"
        data={CLASSES}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <ClassCard
              family={item.family}
              variant={item.variant}
              title={item.title}
              date={item.date}
              time={item.time}
              image={item.image}
              onPress={() => router.push(`/classes/${item.id}/detail` as any)}
            />
          </View>
        )}
        contentContainerStyle={styles.scrollContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.searchRow}>
              <ThemedSearchBar
                value=""
                onChangeText={() => {}}
                placeholder="Search classes..."
              />
            </View>
            <ThemedText variant="body" semantic="muted">
              Access live classes and replays from your mentors. Learn from
              experts and practice in real-time sessions.
            </ThemedText>
          </View>
        }

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
    cardWrapper: {
      flex: 1,
      maxWidth: "50%",
      paddingHorizontal: Spacing.xs,
      marginBottom: Spacing.md,
    },
    row: {
      gap: Spacing.xs,
    },
  });