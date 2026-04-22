import { ThemedMaterialTopTabs } from "@/components/ThemedMaterialTopTabs";

import { ManualPracticeType, manualPracticeTypes } from "./types";

type ManualPracticeTypeTabsProps = {
  selectedType: ManualPracticeType;
  onSelectType: (type: ManualPracticeType) => void;
};

export function ManualPracticeTypeTabs({
  selectedType,
  onSelectType,
}: ManualPracticeTypeTabsProps) {
  return (
    <ThemedMaterialTopTabs
      tabs={manualPracticeTypes}
      selectedTab={selectedType}
      onSelectTab={onSelectType}
    />
  );
}
