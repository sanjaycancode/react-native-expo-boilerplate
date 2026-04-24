import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { router, Stack } from "expo-router";

import { CourseCard } from "@/components/courses/CourseCard";
import { HeaderBackButton } from "@/components/HeaderBackButton";
import { ThemedSearchBar } from "@/components/ThemedSearchBar";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/context/ThemeContext";
import { COURSES } from "@/data/courses";

export default function CoursesScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [searchText, setSearchText] = useState("");

  return (
    <>
      <Stack.Screen
        options={{
          title: "Courses",
          headerBackTitle: "Learn",
          headerLeft: HeaderBackButton,
        }}
      />

      <FlatList
        data={COURSES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CourseCard
            title={item.title}
            modules={item.sections.length}
            lessons={item.sections.reduce(
              (sum, s) => sum + s.lessons.length,
              0,
            )}
            progress={item.progress}
            image={item.image}
            onPress={() => router.push(`/courses/${item.id}/detail`)}
          />
        )}
        contentContainerStyle={styles.scrollContent}
        ListHeaderComponent={
          <View style={styles.header}>
            {/* <ThemedText variant="heading2">Courses</ThemedText> */}

            <ThemedSearchBar
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Search courses..."
            />

            <ThemedText variant="body" semantic="muted">
              Curate your learning journey and prepare for IELTS and PTE with
              structured lessons, guided practice, and clear progress every step
              of the way.
            </ThemedText>
          </View>
        }
        ListEmptyComponent={null}
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
    separator: {
      height: theme.spacing.md,
    },
  });
