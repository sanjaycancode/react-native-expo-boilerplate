import { apiClient } from "@/api/client";

import type {
  GetQuestionsParams,
  GetQuestionsResponse,
  GetQuestionTypesResponse,
  QuestionSection,
} from "@/types";

type GetQuestionTypesParams = {
  section?: QuestionSection;
};

export async function getQuestionTypes(
  params: GetQuestionTypesParams = {},
): Promise<GetQuestionTypesResponse> {
  const response = await apiClient.get<GetQuestionTypesResponse>(
    "/api/practice/question_types",
    {
      params,
    },
  );
  return response.data;
}

export async function getQuestions(
  params: GetQuestionsParams,
): Promise<GetQuestionsResponse> {
  const normalizedSearch =
    typeof params.search === "string" && params.search.trim().length > 0
      ? params.search.trim()
      : undefined;

  const response = await apiClient.get<GetQuestionsResponse>(
    "/api/practice/questions/",
    {
      params: {
        question_type: params.questionType,
        question_types: params.questionTypes?.join(","),
        search: normalizedSearch,
        difficulty_min: params.difficultyMin,
        difficulty_max: params.difficultyMax,
        sort_by: params.sortBy,
        sort_dir: params.sortDir,
        page: params.page,
        limit: params.limit,
      },
    },
  );
  return response.data;
}
