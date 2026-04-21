import React from "react";

import { Stack } from "expo-router";

export default function ClassLayout() {
  return (
    <>
      {/* <Stack.Screen options={{ title: "Classes", headerBackTitle: "Learn" }} /> */}
      <Stack.Screen options={{ headerShown: false }} />
      <Stack />
    </>
  );
}
