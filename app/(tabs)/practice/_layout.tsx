import { Stack } from "expo-router";

export default function PracticeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="mock-test" options={{ title: "Mock Test" }} />
      <Stack.Screen
        name="manual-practice"
        options={{ title: "Manual Practice" }}
      />
      <Stack.Screen
        name="smart-practice"
        options={{ title: "Smart Practice" }}
      />
    </Stack>
  );
}
