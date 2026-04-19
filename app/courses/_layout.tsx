import React from "react";

import { Stack } from "expo-router";

export default function CourseLayout() {
  return (
    <>
      <Stack.Screen options={{ title: "Courses", headerBackTitle: "Learn" }} />
      <Stack />
    </>
  );
}
