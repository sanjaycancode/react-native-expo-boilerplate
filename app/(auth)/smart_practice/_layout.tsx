import React from "react";

import { Stack } from "expo-router";

export default function SmartPracticeLayout() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Smart Practice",
          headerBackTitle: "Practice",
        }}
      />
      <Stack />
    </>
  );
}
