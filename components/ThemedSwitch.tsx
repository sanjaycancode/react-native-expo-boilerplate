import { Switch, SwitchProps } from "react-native";

import { useTheme } from "@/context/ThemeContext";

export type ThemedSwitchProps = Omit<
  SwitchProps,
  "trackColor" | "thumbColor" | "ios_backgroundColor"
> & {
  trackFalseColor?: string;
  trackTrueColor?: string;
  thumbOnColor?: string;
  thumbOffColor?: string;
  iosBackgroundColor?: string;
};

export function ThemedSwitch({
  value,
  onValueChange,
  trackFalseColor,
  trackTrueColor,
  thumbOnColor,
  thumbOffColor,
  iosBackgroundColor,
  ...otherProps
}: ThemedSwitchProps) {
  const { theme } = useTheme();

  const resolvedTrackFalseColor = trackFalseColor ?? theme.colors.border;
  const resolvedTrackTrueColor = trackTrueColor ?? theme.colors.primary;
  const resolvedThumbOnColor = thumbOnColor ?? theme.colors.primaryLight;
  const resolvedThumbOffColor = thumbOffColor ?? theme.colors.textSecondary;
  const resolvedIosBackgroundColor = iosBackgroundColor ?? theme.colors.border;

  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{
        false: resolvedTrackFalseColor,
        true: resolvedTrackTrueColor,
      }}
      thumbColor={value ? resolvedThumbOnColor : resolvedThumbOffColor}
      ios_backgroundColor={resolvedIosBackgroundColor}
      {...otherProps}
    />
  );
}
