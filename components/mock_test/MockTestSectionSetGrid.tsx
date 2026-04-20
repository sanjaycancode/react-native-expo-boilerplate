import { StyleSheet, View } from "react-native";

import { mockTestSectionSets } from "./data";
import { MockTestSectionSetCard } from "./MockTestSectionSetCard";

export function MockTestSectionSetGrid() {
  return (
    <View style={styles.grid}>
      {mockTestSectionSets.map((sectionSet) => (
        <MockTestSectionSetCard key={sectionSet.id} sectionSet={sectionSet} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    gap: 16,
  },
});
