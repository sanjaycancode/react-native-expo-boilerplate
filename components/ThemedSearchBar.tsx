import React, { forwardRef } from "react";

import type {
  ReturnKeyTypeOptions,
  StyleProp,
  TextInput,
  TextStyle,
  ViewStyle,
} from "react-native";

import { SearchBar } from "@/components/SearchBar";

export interface ThemedSearchBarProps {
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

export const ThemedSearchBar = forwardRef<TextInput, ThemedSearchBarProps>(
  (props, ref) => <SearchBar ref={ref} {...props} />,
);

ThemedSearchBar.displayName = "ThemedSearchBar";
