import { apiClient } from "@/api/client";

import type { GetQuestionTypesResponse, QuestionSection } from "@/types";

interface GetQuestionTypesParams {
  section?: QuestionSection;
}

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
