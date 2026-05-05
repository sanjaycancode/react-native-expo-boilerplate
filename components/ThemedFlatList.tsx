import React, { memo } from "react";
import {
  ActivityIndicator,
  FlatList,
  FlatListProps,
  ListRenderItem,
  RefreshControl,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";

import { useTheme } from "@/context/ThemeContext";

type ResolvableComponent =
  | React.ComponentType
  | React.ReactElement
  | null
  | undefined;

export type ThemedFlatListProps<T> = Omit<FlatListProps<T>, "refreshControl"> & {
  data?: readonly T[] | null;
  renderItem: ListRenderItem<T>;
  keyExtractor: (item: T, index: number) => string;
  isLoading?: boolean;
  isRefreshing?: boolean;
  isLoadingMore?: boolean;
  hasMore?: boolean;
  onRefresh?: () => void;
  onLoadMore?: () => void;
  error?: string | null;
  loadingMessage?: string;
  emptyMessage?: string;
  LoadingComponent?: ResolvableComponent;
  ErrorComponent?: ResolvableComponent;
  FooterLoadingComponent?: ResolvableComponent;
  EndReachedComponent?: ResolvableComponent;
  stateContainerStyle?: StyleProp<ViewStyle>;
};

function resolveComponent(component: ResolvableComponent) {
  if (!component) {
    return null;
  }

  return React.isValidElement(component)
    ? component
    : React.createElement(component);
}

function ThemedFlatListComponent<T>({
  data,
  renderItem,
  keyExtractor,
  isLoading = false,
  isRefreshing = false,
  isLoadingMore = false,
  hasMore = false,
  onRefresh,
  onLoadMore,
  onEndReached,
  error = null,
  loadingMessage = "Loading...",
  emptyMessage = "No data found.",
  ListEmptyComponent,
  ListFooterComponent,
  LoadingComponent,
  ErrorComponent,
  FooterLoadingComponent,
  EndReachedComponent,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
  showsHorizontalScrollIndicator = false,
  keyboardShouldPersistTaps = "handled",
  keyboardDismissMode = "on-drag",
  onEndReachedThreshold = 0.4,
  horizontal = false,
  stateContainerStyle,
  ...flatListProps
}: ThemedFlatListProps<T>) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const resolvedData = data ?? [];
  const isEmpty = resolvedData.length === 0;
  const errorMessage = error || "Something went wrong.";

  const defaultLoadingState = (
    <View style={[styles.stateContainer, stateContainerStyle]}>
      <ActivityIndicator color={theme.colors.primary} />
      <ThemedText variant="body" semantic="muted">
        {loadingMessage}
      </ThemedText>
    </View>
  );

  const defaultErrorState = (
    <View style={[styles.stateContainer, stateContainerStyle]}>
      <ThemedText variant="bodySmall" semantic="error" style={styles.centerText}>
        {errorMessage}
      </ThemedText>
    </View>
  );

  const defaultEmptyState = (
    <View style={[styles.stateContainer, stateContainerStyle]}>
      <ThemedText variant="bodySmall" semantic="muted" style={styles.centerText}>
        {emptyMessage}
      </ThemedText>
    </View>
  );

  const defaultFooterLoadingState = (
    <View style={styles.footer}>
      <ActivityIndicator color={theme.colors.primary} />
    </View>
  );

  const resolvedEmptyComponent = isLoading
    ? resolveComponent(LoadingComponent) ?? defaultLoadingState
    : error
      ? resolveComponent(ErrorComponent) ?? defaultErrorState
      : resolveComponent(ListEmptyComponent) ?? defaultEmptyState;

  const resolvedBaseFooter = resolveComponent(ListFooterComponent);

  const resolvedFooterComponent = isLoadingMore ? (
    <>
      {resolvedBaseFooter}
      {resolveComponent(FooterLoadingComponent) ?? defaultFooterLoadingState}
    </>
  ) : !hasMore && resolvedData.length > 0 && EndReachedComponent ? (
    <>
      {resolvedBaseFooter}
      {resolveComponent(EndReachedComponent)}
    </>
  ) : (
    resolvedBaseFooter
  );

  const handleEndReached: NonNullable<FlatListProps<T>["onEndReached"]> = (
    info,
  ) => {
    onEndReached?.(info);

    if (!onLoadMore) {
      return;
    }

    if (!hasMore || isLoading || isRefreshing || isLoadingMore || isEmpty) {
      return;
    }

    onLoadMore();
  };

  return (
    <FlatList
      {...flatListProps}
      data={resolvedData}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListEmptyComponent={resolvedEmptyComponent}
      ListFooterComponent={resolvedFooterComponent}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
            colors={[theme.colors.primary]}
          />
        ) : undefined
      }
      onEndReached={handleEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      contentContainerStyle={[
        styles.contentContainer,
        !horizontal && isEmpty ? styles.emptyContentContainer : null,
        contentContainerStyle,
      ]}
      horizontal={horizontal}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      keyboardDismissMode={keyboardDismissMode}
    />
  );
}

export const ThemedFlatList = memo(ThemedFlatListComponent) as <T>(
  props: ThemedFlatListProps<T>,
) => React.ReactElement;

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    contentContainer: {
      flexGrow: 1,
    },
    emptyContentContainer: {
      flexGrow: 1,
    },
    stateContainer: {
      alignItems: "center",
      justifyContent: "center",
      gap: theme.spacing.md,
      minHeight: theme.spacing.xl * 10,
      padding: theme.spacing.lg,
    },
    centerText: {
      textAlign: "center",
    },
    footer: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: theme.spacing.lg,
    },
  });
