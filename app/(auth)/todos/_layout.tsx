import React from "react";

import { Stack } from "expo-router";

export default function TodosLayout() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Stack />
    </>
  );
}
