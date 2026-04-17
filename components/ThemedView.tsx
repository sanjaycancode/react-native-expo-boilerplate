import { View as DefaultView } from "react-native";

import { useTheme } from "@/context/ThemeContext";

type ThemedViewProps = DefaultView["props"] & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView(props: ThemedViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const { theme } = useTheme();

  const backgroundColor =
    theme.mode === "light"
      ? (lightColor ?? theme.colors.background)
      : (darkColor ?? theme.colors.background);

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export default ThemedView;
