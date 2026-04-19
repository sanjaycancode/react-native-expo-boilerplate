import {
    HeaderBackButton as RNHeaderBackButton,
    type HeaderBackButtonProps as RNHeaderBackButtonProps,
} from "@react-navigation/elements";

import { useRouter } from "expo-router";

export function HeaderBackButton(props: RNHeaderBackButtonProps) {
  const router = useRouter();

  if (!router.canGoBack()) return null;

  const handlePress: RNHeaderBackButtonProps["onPress"] = () => {
    if (props.onPress) {
      props.onPress();
      return;
    }
    router.back();
  };

  return <RNHeaderBackButton {...props} onPress={handlePress} />;
}
