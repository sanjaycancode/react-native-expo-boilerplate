import React from "react";

import { Stack } from "expo-router";

export default function ManualPracticeLayout() {
  return (
    <>
      <Stack.Screen
        options={{
          // title: "Manual Practice",
          // headerBackTitle: "Practice",
          headerShown: false,
        }}
      />
      <Stack />
    </>
  );
}
