import type Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps } from "react";

export type SmartPracticeHeatmapItem = {
  id: string;
  label: string;
  progress: number;
};

export type SmartPracticePacingItem = {
  id: string;
  title: string;
  durationSeconds: number;
  progress: number;
  iconName: ComponentProps<typeof Ionicons>["name"];
};

export type SmartPracticeReviewItem = {
  id: string;
  title: string;
  description: string;
  errorCount: number;
  iconName: ComponentProps<typeof Ionicons>["name"];
  tone: "danger" | "primary";
};

export const smartPracticeHeatmapItems: SmartPracticeHeatmapItem[] = [
  {
    id: "grammar",
    label: "Grammar",
    progress: 0,
  },
  {
    id: "vocabulary",
    label: "Vocabulary",
    progress: 0,
  },
  {
    id: "coherence",
    label: "Coherence",
    progress: 0,
  },
  {
    id: "reading-comp",
    label: "Reading Comp",
    progress: 0,
  },
];

export const smartPracticePacingItems: SmartPracticePacingItem[] = [
  {
    id: "pte-repeat-sentence",
    title: "PTE Repeat Sentence",
    durationSeconds: 9,
    progress: 40,
    iconName: "people-outline",
  },
  {
    id: "writing-task-1",
    title: "Writing Task 1",
    durationSeconds: 18,
    progress: 78,
    iconName: "document-text-outline",
  },
];

export const smartPracticeReviewItems: SmartPracticeReviewItem[] = [
  {
    id: "reading-comprehension",
    title: "Reading Comprehension",
    description: "Needs immediate attention",
    errorCount: 33,
    iconName: "alert-circle",
    tone: "danger",
  },
  {
    id: "pronunciation",
    title: "Pronunciation",
    description: "Moderate difficulty",
    errorCount: 22,
    iconName: "mic",
    tone: "primary",
  },
  {
    id: "oral-fluency",
    title: "Oral Fluency",
    description: "Focus on pauses",
    errorCount: 22,
    iconName: "people",
    tone: "primary",
  },
  {
    id: "task-achievement",
    title: "Task Achievement",
    description: "Improve structure",
    errorCount: 17,
    iconName: "checkbox",
    tone: "primary",
  },
];
