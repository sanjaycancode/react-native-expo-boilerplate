import React, { useEffect } from "react";

import { useLocalSearchParams } from "expo-router";

import { ThemedText } from "@/components/ThemedText";

import { useMarkNotificationReadMutation } from "@/hooks/api/useNotificationApi";

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const markReadMutation = useMarkNotificationReadMutation();

  useEffect(() => {
    if (!id) return;
    markReadMutation.mutate(id);
  }, [id, markReadMutation]);

  return (
    <>
      <ThemedText>Detail page id{id}</ThemedText>
    </>
  );
}
