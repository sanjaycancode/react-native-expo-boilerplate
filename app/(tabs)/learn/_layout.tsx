import { Stack } from "expo-router";

export default function LearnLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="courses" options={{ title: "Courses" }} />
      <Stack.Screen name="classes" options={{ title: "Classes" }} />
    </Stack>
  );
}
