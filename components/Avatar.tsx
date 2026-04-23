import React, { useMemo } from "react";
import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";

import { type AvatarSize, AvatarSizes } from "@/constants/Themes";

import { useTheme } from "@/context/ThemeContext";

export type AvatarProps = {
  name: string;
  uri?: string | null;
  size?: number;
  sizeVariant?: AvatarSize;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
};

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
  return (first + last).toUpperCase();
}

export function Avatar({
  name,
  uri,
  size,
  sizeVariant,
  style,
  imageStyle,
  backgroundColor,
  borderColor,
  textColor,
}: AvatarProps) {
  const { theme } = useTheme();
  const colors = theme.colors;
  const styles = useMemo(() => createStyles(theme), [theme.mode]);
  const initials = useMemo(() => getInitials(name), [name]);
  const resolvedSize = size ?? AvatarSizes[sizeVariant ?? "md"];
  const initialsFontSize = Math.max(12, Math.min(34, resolvedSize * 0.34));
  const initialsLineHeight = Math.round(initialsFontSize * 1.15);

  return (
    <View
      accessibilityRole="image"
      accessibilityLabel={`${name} avatar`}
      style={[
        styles.wrap,
        {
          width: resolvedSize,
          height: resolvedSize,
          borderRadius: theme.borderRadius.full,
          borderColor: borderColor ?? colors.border,
          backgroundColor: backgroundColor ?? colors.surface,
        },
        style,
      ]}
    >
      {uri ? (
        <Image
          source={{ uri }}
          style={[
            styles.image,
            { backgroundColor: colors.overlay },
            imageStyle,
          ]}
        />
      ) : (
        <ThemedText
          variant="button"
          style={[
            styles.initials,
            {
              color: textColor ?? colors.text,
              fontSize: initialsFontSize,
              lineHeight: initialsLineHeight,
            },
          ]}
        >
          {initials}
        </ThemedText>
      )}
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    wrap: {
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      borderWidth: 1,
    },
    image: {
      width: "100%",
      height: "100%",
    },
    initials: {
      includeFontPadding: false,
      fontFamily: theme.typography.button.fontFamily,
      fontWeight: theme.typography.button.fontWeight,
    },
  });
