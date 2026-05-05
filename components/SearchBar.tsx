import React, { forwardRef } from "react";
import {
  ActivityIndicator,
  Pressable,
  type ReturnKeyTypeOptions,
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { useTheme } from "@/context/ThemeContext";

export interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onSubmit?: () => void;
  onClear?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  returnKeyType?: ReturnKeyTypeOptions;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export const SearchBar = forwardRef<TextInput, SearchBarProps>(
  (
    {
      value,
      onChangeText,
      placeholder = "Search...",
      onSubmit,
      onClear,
      isLoading = false,
      disabled = false,
      autoFocus = false,
      containerStyle,
      inputStyle,
      returnKeyType = "search",
      accessibilityLabel,
      accessibilityHint,
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const hasText = value.trim().length > 0;

    const handleClear = () => {
      onChangeText("");
      onClear?.();
    };

    return (
      <View
        style={[
          styles.container,
          disabled && styles.containerDisabled,
          containerStyle,
        ]}
      >
        <Ionicons
          name="search-outline"
          size={18}
          color={disabled ? theme.colors.disabled : theme.colors.textSecondary}
        />

        <TextInput
          ref={ref}
          style={[styles.input, disabled && styles.inputDisabled, inputStyle]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textTertiary}
          editable={!disabled}
          autoFocus={autoFocus}
          returnKeyType={returnKeyType}
          onSubmitEditing={() => onSubmit?.()}
          autoCapitalize="none"
          autoCorrect={false}
          spellCheck={false}
          selectionColor={theme.colors.primary}
          cursorColor={theme.colors.primary}
          accessibilityLabel={accessibilityLabel}
          accessibilityHint={accessibilityHint}
        />

        {isLoading ? (
          <ActivityIndicator
            size="small"
            color={disabled ? theme.colors.disabled : theme.colors.primary}
          />
        ) : null}

        {!isLoading && hasText ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Clear search"
            accessibilityHint="Clears the current search text"
            disabled={disabled}
            hitSlop={8}
            onPress={handleClear}
            style={({ pressed }) => [
              styles.clearButton,
              pressed && !disabled && styles.clearButtonPressed,
            ]}
          >
            <Ionicons
              name="close-circle"
              size={18}
              color={disabled ? theme.colors.disabled : theme.colors.textSecondary}
            />
          </Pressable>
        ) : null}
      </View>
    );
  },
);

SearchBar.displayName = "SearchBar";

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    container: {
      minHeight: 48,
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.full,
      backgroundColor: theme.colors.backgroundAlt,
      paddingHorizontal: theme.spacing.md,
    },
    containerDisabled: {
      opacity: 0.7,
      backgroundColor: theme.colors.surface,
    },
    input: {
      flex: 1,
      color: theme.colors.text,
      fontFamily: theme.typography.body.fontFamily,
      fontSize: theme.typography.body.fontSize,
      lineHeight: theme.typography.body.lineHeight,
      paddingVertical: theme.spacing.md,
    },
    inputDisabled: {
      color: theme.colors.disabled,
    },
    clearButton: {
      alignItems: "center",
      justifyContent: "center",
    },
    clearButtonPressed: {
      opacity: 0.7,
    },
  });

/*
Usage example:

const [search, setSearch] = useState("");

<SearchBar
  value={search}
  onChangeText={setSearch}
  placeholder="Search questions..."
  isLoading={isFetching}
  onClear={() => setSearch("")}
  onSubmit={() => console.log("submit search")}
/>
*/
