import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Stack />
    </>
  );
}
