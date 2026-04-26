import { apiClient } from "@/api/client";

import type { GetQtypesResponse, QtypeSection } from "@/types";

interface GetQtypesParams {
  section?: QtypeSection;
}

export async function getQtypes(
  params: GetQtypesParams = {},
): Promise<GetQtypesResponse> {
  const url = apiClient.getUri({
    url: "/api/qtypes",
    params,
  });

  console.log("GET qtypes", url);
  const response = await apiClient.get<GetQtypesResponse>(
    "/api/practice/question_types",
    {
      params,
    },
  );

  console.log(response.data);
  return response.data;
}
