import React from "react";
import { View } from "react-native";

import { Stack, useLocalSearchParams } from "expo-router";

import { ThemedText } from "@/components/ThemedText";

export default function CourseDetail() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  return (
    <>
      <Stack.Screen options={{ title: "Course Detail" }} />
      <View>
        <ThemedText>ID: {id ?? ""}</ThemedText>
      </View>
    </>
  );
}
