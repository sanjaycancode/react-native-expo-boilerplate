import { useLocalSearchParams } from "expo-router/build/hooks";

import { ThemedText } from "@/components/ThemedText";

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  return (
    <>
      <ThemedText>Detail page id{id}</ThemedText>
    </>
  );
}
