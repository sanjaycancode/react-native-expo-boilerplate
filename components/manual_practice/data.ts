import Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps } from "react";

import { ManualPracticeType } from "./types";

export type ManualPracticeTask = {
  id: string;
  title: string;
  questionCount: number;
  completedQuestionCount: number;
  durationMinutes?: number;
  iconName: ComponentProps<typeof Ionicons>["name"];
  actionLabel: "Practice" | "Resume";
};

export type ManualPracticeSectionData = {
  type: Exclude<ManualPracticeType, "All types">;
  tasks: ManualPracticeTask[];
};

export const manualPracticeSections: ManualPracticeSectionData[] = [
  {
    type: "Listening",
    tasks: [
      {
        id: "flow-chart-completion",
        title: "Flow-chart Completion",
        questionCount: 12,
        completedQuestionCount: 0,
        iconName: "headset-outline",
        actionLabel: "Practice",
      },
      {
        id: "sentence-completion",
        title: "Sentence Completion",
        questionCount: 8,
        completedQuestionCount: 3,
        iconName: "headset-outline",
        actionLabel: "Resume",
      },
    ],
  },
  {
    type: "Reading",
    tasks: [
      {
        id: "multiple-choice-questions",
        title: "Multiple Choice Questions",
        questionCount: 15,
        completedQuestionCount: 0,
        iconName: "book-outline",
        actionLabel: "Practice",
      },
      {
        id: "matching-headings",
        title: "Matching Headings",
        questionCount: 10,
        completedQuestionCount: 8,
        iconName: "book-outline",
        actionLabel: "Resume",
      },
    ],
  },
  {
    type: "Writing",
    tasks: [
      {
        id: "task-1-data-analysis",
        title: "Task 1: Data Analysis",
        questionCount: 1,
        completedQuestionCount: 0,
        durationMinutes: 20,
        iconName: "list-outline",
        actionLabel: "Practice",
      },
    ],
  },
];
