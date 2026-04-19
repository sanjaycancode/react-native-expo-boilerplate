import React from "react";

import { Stack } from "expo-router";

export default function MockTestLayout() {
  return (
    <>
      <Stack.Screen
        options={{ title: "Mock Test", headerBackTitle: "Practice" }}
      />
      <Stack />
    </>
  );
}
