import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { router, Stack } from "expo-router";

import { CourseCard } from "@/components/courses/CourseCard";
import { HeaderBackButton } from "@/components/HeaderBackButton";
import { ThemedSearchBar } from "@/components/ThemedSearchBar";
import { ThemedText } from "@/components/ThemedText";

import { Spacing } from "@/constants/Themes";

import { COURSES } from "@/data/courses";

export default function CoursesScreen() {
  const styles = createStyles();
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
        key="courseGrid"
        data={COURSES}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <CourseCard
              title={item.title}
              modules={item.sections.length}
              lessons={item.sections.reduce((sum, s) => sum + s.lessons.length, 0)}
              progress={item.progress}
              image={item.image}
              onPress={() => router.push(`/courses/${item.id}/detail`)}
            />
          </View>
        )}
        contentContainerStyle={styles.scrollContent}
        ListHeaderComponent={
          <View style={styles.header}>
            
  
            <ThemedSearchBar
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Search courses..."
            />
            
            <ThemedText variant="body" semantic="muted">
              Curate your learning journey and prepare for IELTS and PTE
              with structured lessons, guided practice, and clear progress every step of the way.
            </ThemedText>
          </View>
        }
        ListEmptyComponent={null}
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