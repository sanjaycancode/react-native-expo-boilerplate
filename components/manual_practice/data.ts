import type Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps } from "react";

import type { ManualPracticeType } from "./types";

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
  typeCount: number;
  description: string;
  tasks: ManualPracticeTask[];
};

export const manualPracticeSections: ManualPracticeSectionData[] = [
  {
    type: "Listening",
    typeCount: 10,
    description: "Aim for one focused set. Accuracy follows repetition.",
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
        id: "multiple-choice-multiple-answers",
        title: "Multiple Choice (Multiple Answers)",
        questionCount: 7,
        completedQuestionCount: 0,
        iconName: "headset-outline",
        actionLabel: "Practice",
      },
      {
        id: "multiple-choice-single-answer",
        title: "Multiple Choice (Single Answer)",
        questionCount: 9,
        completedQuestionCount: 0,
        iconName: "headset-outline",
        actionLabel: "Practice",
      },
      {
        id: "note-completion-listening",
        title: "Note Completion",
        questionCount: 11,
        completedQuestionCount: 4,
        iconName: "headset-outline",
        actionLabel: "Resume",
      },
      {
        id: "plan-map-diagram-labelling",
        title: "Plan/Map/Diagram Labelling",
        questionCount: 6,
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
      {
        id: "short-answer-listening",
        title: "Short Answer",
        questionCount: 5,
        completedQuestionCount: 0,
        iconName: "headset-outline",
        actionLabel: "Practice",
      },
      {
        id: "table-completion-listening",
        title: "Table Completion",
        questionCount: 10,
        completedQuestionCount: 6,
        iconName: "headset-outline",
        actionLabel: "Resume",
      },
    ],
  },
  {
    type: "Reading",
    typeCount: 14,
    description: "Build speed with short, timed sets.",
    tasks: [
      {
        id: "diagram-label-completion",
        title: "Diagram Label Completion",
        questionCount: 6,
        completedQuestionCount: 0,
        iconName: "book-outline",
        actionLabel: "Practice",
      },
      {
        id: "flow-chart-completion-reading",
        title: "Flow-chart completion",
        questionCount: 9,
        completedQuestionCount: 0,
        iconName: "book-outline",
        actionLabel: "Practice",
      },
      {
        id: "matching-features",
        title: "Matching Features",
        questionCount: 7,
        completedQuestionCount: 2,
        iconName: "book-outline",
        actionLabel: "Resume",
      },
      {
        id: "matching-headings",
        title: "Matching Headings",
        questionCount: 10,
        completedQuestionCount: 0,
        iconName: "book-outline",
        actionLabel: "Practice",
      },
      {
        id: "matching-information",
        title: "Matching Information",
        questionCount: 8,
        completedQuestionCount: 5,
        iconName: "book-outline",
        actionLabel: "Resume",
      },
      {
        id: "matching-sentence-endings",
        title: "Matching Sentence Endings",
        questionCount: 5,
        completedQuestionCount: 0,
        iconName: "book-outline",
        actionLabel: "Practice",
      },
      {
        id: "multiple-choice-more-than-one-answer",
        title: "Multiple Choice (more than one answer)",
        questionCount: 12,
        completedQuestionCount: 0,
        iconName: "book-outline",
        actionLabel: "Practice",
      },
      {
        id: "multiple-choice-one-answer",
        title: "Multiple Choice (one answer)",
        questionCount: 11,
        completedQuestionCount: 4,
        iconName: "book-outline",
        actionLabel: "Resume",
      },
      {
        id: "note-completion-reading",
        title: "Note Completion",
        questionCount: 6,
        completedQuestionCount: 3,
        iconName: "book-outline",
        actionLabel: "Resume",
      },
      {
        id: "sentence-completion-reading",
        title: "Sentence Completion",
        questionCount: 9,
        completedQuestionCount: 0,
        iconName: "book-outline",
        actionLabel: "Practice",
      },
      {
        id: "short-answer-reading",
        title: "Short Answer",
        questionCount: 4,
        completedQuestionCount: 1,
        iconName: "book-outline",
        actionLabel: "Resume",
      },
      {
        id: "table-completion-reading",
        title: "Table completion",
        questionCount: 8,
        completedQuestionCount: 2,
        iconName: "book-outline",
        actionLabel: "Resume",
      },
      {
        id: "true-false-not-given",
        title: "True/False/Not Given",
        questionCount: 13,
        completedQuestionCount: 7,
        iconName: "book-outline",
        actionLabel: "Resume",
      },
      {
        id: "yes-no-not-given",
        title: "Yes/No/Not Given",
        questionCount: 10,
        completedQuestionCount: 0,
        iconName: "book-outline",
        actionLabel: "Practice",
      },
    ],
  },
  {
    type: "Writing",
    typeCount: 2,
    description: "Quality first: one clear answer beats three rushed ones.",
    tasks: [
      {
        id: "writing-task-1-academic",
        title: "Writing Task 1 (Academic)",
        questionCount: 4,
        completedQuestionCount: 1,
        iconName: "list-outline",
        actionLabel: "Resume",
      },
      {
        id: "writing-task-2",
        title: "Writing Task 2",
        questionCount: 3,
        completedQuestionCount: 0,
        iconName: "list-outline",
        actionLabel: "Practice",
      },
    ],
  },
  {
    type: "Speaking",
    typeCount: 3,
    description: "One attempt now beats perfect practice later.",
    tasks: [
      {
        id: "speaking-part-1",
        title: "Speaking Part 1",
        questionCount: 8,
        completedQuestionCount: 0,
        iconName: "mic-outline",
        actionLabel: "Practice",
      },
      {
        id: "speaking-part-2",
        title: "Speaking Part 2",
        questionCount: 5,
        completedQuestionCount: 2,
        iconName: "mic-outline",
        actionLabel: "Resume",
      },
      {
        id: "speaking-part-3",
        title: "Speaking Part 3",
        questionCount: 6,
        completedQuestionCount: 0,
        iconName: "mic-outline",
        actionLabel: "Practice",
      },
    ],
  },
];
