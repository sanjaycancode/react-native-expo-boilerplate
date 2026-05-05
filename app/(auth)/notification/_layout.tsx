import { Stack } from "expo-router";

export default function NotificationLayout() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Stack />
    </>
  );
}
