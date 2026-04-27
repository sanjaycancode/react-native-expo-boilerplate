export const manualPracticeTypes = [
  "All",
  "Listening",
  "Reading",
  "Writing",
  "Speaking",
] as const;

export type ManualPracticeType = (typeof manualPracticeTypes)[number];
