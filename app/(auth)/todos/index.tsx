import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { Stack, useRouter } from "expo-router";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedFAB } from "@/components/ThemedFAB";
import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

import { useTodosQuery } from "@/hooks/api";

export default function TodosScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const router = useRouter();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const todosQuery = useTodosQuery();

  const todos = (todosQuery.data ?? []).slice(0, 12);

  function getErrorMessage(error: unknown): string {
    if (typeof error === "object" && error !== null && "message" in error) {
      const { message } = error as { message?: unknown };
      if (typeof message === "string") {
        return message;
      }
    }

    return "Something went wrong.";
  }

  function renderLoadingState() {
    return (
      <ThemedCard variant="outlined">
        <ThemedText variant="body">Loading todos...</ThemedText>
      </ThemedCard>
    );
  }

  function renderErrorState() {
    return (
      <ThemedCard variant="outlined">
        <ThemedText variant="bodySmall" semantic="error">
          Failed to load todos: {getErrorMessage(todosQuery.error)}
        </ThemedText>
      </ThemedCard>
    );
  }

  function renderEmptyState() {
    return (
      <ThemedCard variant="outlined">
        <ThemedText variant="body" semantic="muted">
          No todos available.
        </ThemedText>
      </ThemedCard>
    );
  }

  // Guard clause pattern
  if (todosQuery.isLoading) return renderLoadingState();
  if (todosQuery.isError) return renderErrorState();
  if (todos.length === 0) return renderEmptyState();

  return (
    <>
      <Stack.Screen options={{ title: "Todos" }} />

      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.listContent}
          onScroll={(event) => {
            const nextIsScrolled =
              event.nativeEvent.contentOffset.y > theme.spacing.sm;
            setIsScrolled((prev) =>
              prev === nextIsScrolled ? prev : nextIsScrolled,
            );
          }}
          scrollEventThrottle={16}
        >
          <ThemedText variant="body" semantic="muted">
            Review and create demo tasks from JSONPlaceholder.
          </ThemedText>

          {todos.map((todo) => (
            <ThemedCard
              key={todo.id}
              variant="outlined"
              style={styles.todoCard}
            >
              <ThemedText variant="heading6" numberOfLines={2}>
                {todo.title}
              </ThemedText>
              <ThemedText variant="caption" semantic="muted">
                User #{todo.userId}
              </ThemedText>
              <View style={styles.statusRow}>
                <View
                  style={[
                    styles.statusDot,
                    todo.completed ? styles.statusDotCompleted : null,
                  ]}
                />
                <ThemedText
                  variant="bodySmall"
                  semantic={todo.completed ? "success" : "muted"}
                >
                  {todo.completed ? "Completed" : "Pending"}
                </ThemedText>
              </View>
            </ThemedCard>
          ))}
        </ScrollView>

        <ThemedFAB
          label="Create Todo"
          onPress={() => {
            router.push("/todos/create");
          }}
          isScrolled={isScrolled}
        />
      </View>
    </>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    container: {
      flex: 1,

      gap: theme.spacing.md,
    },
    listContent: {
      gap: theme.spacing.md,
      padding: theme.spacing.lg,
      paddingBottom: theme.spacing.xl * 4,
    },
    todoCard: {
      gap: theme.spacing.sm,
    },
    statusRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,
    },
    statusDot: {
      width: 10,
      height: 10,
      borderRadius: theme.borderRadius.full,
      backgroundColor: theme.colors.warning,
    },
    statusDotCompleted: {
      backgroundColor: theme.colors.success,
    },
  });
