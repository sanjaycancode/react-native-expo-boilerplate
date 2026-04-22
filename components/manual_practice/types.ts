export const manualPracticeTypes = [
  "All types",
  "Listening",
  "Reading",
  "Writing",
  "Speaking",
] as const;

export type ManualPracticeType = (typeof manualPracticeTypes)[number];
