import { useQuery } from "@tanstack/react-query";

import { getQuestionTypes } from "@/api/services";

import type { GetQuestionTypesResponse, QuestionSection } from "@/types";

export type { GetQuestionTypesResponse, QuestionSection };

export const questionKeys = {
  all: ["questions"] as const,
  types: () => [...questionKeys.all, "types"] as const,
  typesBySection: (section?: QuestionSection) =>
    section
      ? ([...questionKeys.types(), section] as const)
      : questionKeys.types(),
};

export function useQuestionTypesQuery(section?: QuestionSection) {
  return useQuery({
    queryKey: questionKeys.typesBySection(section),
    queryFn: () => getQuestionTypes({ section }),
  });
}
