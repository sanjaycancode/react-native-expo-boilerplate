import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { getQuestions, getQuestionTypes } from "@/api/services";

import type {
  GetQuestionsResponse,
  GetQuestionTypesResponse,
  QuestionSection,
} from "@/types";

export type { GetQuestionsResponse, GetQuestionTypesResponse, QuestionSection };

export const questionKeys = {
  all: ["questions"] as const,
  types: () => [...questionKeys.all, "types"] as const,
  typesBySection: (section?: QuestionSection) =>
    section
      ? ([...questionKeys.types(), section] as const)
      : questionKeys.types(),
  list: () => [...questionKeys.all, "list"] as const,
  listByType: (questionType?: string, limit?: number) =>
    questionType
      ? ([...questionKeys.list(), questionType, limit] as const)
      : questionKeys.list(),
};

const DEFAULT_QUESTIONS_LIMIT = 10;

function getNextQuestionsPageParam(
  lastPage: GetQuestionsResponse,
  allPages: GetQuestionsResponse[],
) {
  const total = Number(lastPage.meta.total) || 0;
  const pageSize = Number(lastPage.meta.limit) || DEFAULT_QUESTIONS_LIMIT;
  const loadedCount = allPages.reduce(
    (count, page) => count + page.data.length,
    0,
  );

  if (loadedCount >= total) {
    return undefined;
  }

  if (lastPage.data.length < pageSize) {
    return undefined;
  }

  return allPages.length + 1;
}

export function useQuestionTypesQuery(section?: QuestionSection) {
  return useQuery({
    queryKey: questionKeys.typesBySection(section),
    queryFn: () => getQuestionTypes({ section }),
  });
}

export function useQuestionsInfiniteQuery(
  questionType?: string,
  limit = DEFAULT_QUESTIONS_LIMIT,
) {
  const queryClient = useQueryClient();
  const queryKey = questionKeys.listByType(questionType, limit);
  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) =>
      getQuestions({
        questionType: questionType ?? "",
        page: pageParam,
        limit,
      }),
    initialPageParam: 1,
    getNextPageParam: getNextQuestionsPageParam,
    enabled: Boolean(questionType),
  });

  async function refreshFirstPage() {
    await queryClient.resetQueries({
      queryKey,
      exact: true,
    });
  }

  return {
    ...query,
    refreshFirstPage,
  };
}
