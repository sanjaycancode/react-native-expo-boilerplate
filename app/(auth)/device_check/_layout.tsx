import { Stack } from "expo-router";

export default function DeviceCheckLayout() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Stack />
    </>
  );
}
