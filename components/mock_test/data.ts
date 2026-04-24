import type Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps } from "react";

export type MockTestSectionSet = {
  id: string;
  title: string;
  practiceSetCount: number;
  iconName: ComponentProps<typeof Ionicons>["name"];
};

export type MockTestAttemptStatus = "started" | "completed" | "expired";

export type MockTestAttempt = {
  id: string;
  title: string;
  date: string;
  status: MockTestAttemptStatus;
  progress?: number;
  score?: string;
  iconName: ComponentProps<typeof Ionicons>["name"];
};

export const mockTestSectionSets: MockTestSectionSet[] = [
  {
    id: "speaking",
    title: "Speaking",
    practiceSetCount: 12,
    iconName: "people-outline",
  },
  {
    id: "listening",
    title: "Listening",
    practiceSetCount: 8,
    iconName: "headset-outline",
  },
];

export const mockTestAttempts: MockTestAttempt[] = [
  {
    id: "pte-acad-test-1",
    title: "PTE-ACAD TEST 1",
    date: "Oct 24, 2023",
    status: "started",
    progress: 45,
    iconName: "clipboard-outline",
  },
  {
    id: "sectional-mock-a",
    title: "SECTIONAL MOCK A",
    date: "Oct 22, 2023",
    status: "completed",
    score: "78/90",
    iconName: "checkbox-outline",
  },
  {
    id: "pte-acad-test-2",
    title: "PTE-ACAD TEST 2",
    date: "Oct 15, 2023",
    status: "expired",
    iconName: "clipboard-outline",
  },
];
