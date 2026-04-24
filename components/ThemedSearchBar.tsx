import React from "react";

import { Ionicons } from "@expo/vector-icons";

import {
  ThemedTextInput,
  type ThemedTextInputProps,
} from "@/components/ThemedTextInput";

export type ThemedSearchBarProps = Omit<
  ThemedTextInputProps,
  "label" | "startIcon" | "endIcon" | "onEndIconPress"
> & {
  onClear?: () => void;
};

export function ThemedSearchBar({
  value,
  onChangeText,
  placeholder = "Search...",
  onClear,
  ...props
}: ThemedSearchBarProps) {
  const showClear = typeof value === "string" && value.length > 0;

  return (
    <ThemedTextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      variant="accent"
      color="primary"
      startIcon={<Ionicons name="search-outline" size={18} />}
      endIcon={showClear ? <Ionicons name="close-circle" size={18} /> : undefined}
      onEndIconPress={
        showClear
          ? () => {
              if (onClear) onClear();
              else onChangeText?.("");
            }
          : undefined
      }
      {...props}
    />
  );
}
