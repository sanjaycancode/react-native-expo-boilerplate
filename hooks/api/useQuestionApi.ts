import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { getQuestions, getQuestionTypes } from "@/api/services";

import type {
  GetQuestionsParams,
  GetQuestionsResponse,
  GetQuestionTypesResponse,
  QuestionSection,
} from "@/types";

export type {
  GetQuestionsParams,
  GetQuestionsResponse,
  GetQuestionTypesResponse,
  QuestionSection,
};

export const questionKeys = {
  all: ["questions"] as const,
  types: () => [...questionKeys.all, "types"] as const,
  typesBySection: (section?: QuestionSection) =>
    section
      ? ([...questionKeys.types(), section] as const)
      : questionKeys.types(),
  list: () => [...questionKeys.all, "list"] as const,
  listByFilters: (params: Partial<GetQuestionsParams> = {}) =>
    [
      ...questionKeys.list(),
      params.questionType ?? null,
      params.questionTypes?.join(",") ?? null,
      params.search?.trim() ?? null,
      params.difficultyMin ?? null,
      params.difficultyMax ?? null,
      params.sortBy ?? null,
      params.sortDir ?? null,
      params.limit ?? DEFAULT_QUESTIONS_LIMIT,
    ] as const,
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
  params: Partial<GetQuestionsParams> = {},
) {
  const queryClient = useQueryClient();
  const normalizedParams: GetQuestionsParams = {
    ...params,
    search:
      typeof params.search === "string" && params.search.trim().length > 0
        ? params.search.trim()
        : undefined,
    limit: params.limit ?? DEFAULT_QUESTIONS_LIMIT,
  };
  const queryKey = questionKeys.listByFilters(normalizedParams);
  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) =>
      getQuestions({
        ...normalizedParams,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: getNextQuestionsPageParam,
    enabled: Boolean(
      normalizedParams.questionType ||
        (normalizedParams.questionTypes?.length ?? 0) > 0,
    ),
  });

  async function refreshFirstPage() {
    await queryClient.resetQueries({
      queryKey,
      exact: true,
    });
  }

  return {
    ...query,
    queryKey,
    refreshFirstPage,
  };
}
