import { apiClient } from "@/api/client";

import type {
  GetQuestionsResponse,
  GetQuestionTypesResponse,
  QuestionSection,
} from "@/types";

type GetQuestionTypesParams = {
  section?: QuestionSection;
};

type GetQuestionsParams = {
  questionType: string;
  page?: number;
  limit?: number;
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
  const response = await apiClient.get<GetQuestionsResponse>(
    "/api/practice/questions/",
    {
      params: {
        question_type: params.questionType,
        page: params.page,
        limit: params.limit,
      },
    },
  );
  return response.data;
}
