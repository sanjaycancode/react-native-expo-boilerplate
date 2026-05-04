export const manualPracticeTypes = [
  "All",
  "Listening",
  "Reading",
  "Writing",
  "Speaking",
] as const;

export type ManualPracticeType = (typeof manualPracticeTypes)[number];

export const manualPracticeQuestionDifficultyOptions = [
  "all",
  "easy",
  "medium",
  "hard",
] as const;

export type ManualPracticeQuestionDifficulty =
  (typeof manualPracticeQuestionDifficultyOptions)[number];
