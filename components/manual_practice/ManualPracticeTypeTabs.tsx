import { ThemedMaterialTopTabs } from "@/components/ThemedMaterialTopTabs";

import { manualPracticeSections } from "./data";
import { ManualPracticeType, manualPracticeTypes } from "./types";

type ManualPracticeTypeTabsProps = {
  selectedType: ManualPracticeType;
  onSelectType: (type: ManualPracticeType) => void;
};

function getTypeCount(type: ManualPracticeType) {
  if (type === "All types") {
    return manualPracticeSections.reduce(
      (total, section) => total + section.typeCount,
      0,
    );
  }

  return (
    manualPracticeSections.find((section) => section.type === type)
      ?.typeCount ?? 0
  );
}

export function ManualPracticeTypeTabs({
  selectedType,
  onSelectType,
}: ManualPracticeTypeTabsProps) {
  return (
    <ThemedMaterialTopTabs
      tabs={manualPracticeTypes}
      selectedTab={selectedType}
      onSelectTab={onSelectType}
      getMetaLabel={(type) => String(getTypeCount(type))}
    />
  );
}
