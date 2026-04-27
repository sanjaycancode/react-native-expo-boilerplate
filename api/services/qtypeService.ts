import { apiClient } from "@/api/client";

import type { GetQtypesResponse, QtypeSection } from "@/types";

interface GetQtypesParams {
  section?: QtypeSection;
}

export async function getQtypes(
  params: GetQtypesParams = {},
): Promise<GetQtypesResponse> {
  const response = await apiClient.get<GetQtypesResponse>(
    "/api/practice/question_types",
    {
      params,
    },
  );
  return response.data;
}
