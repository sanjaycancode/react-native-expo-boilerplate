import { useQuery } from "@tanstack/react-query";

import { getQtypes } from "@/api/services";

import type { GetQtypesResponse, QtypeSection } from "@/types";

export type { GetQtypesResponse, QtypeSection };

export const qtypeKeys = {
  all: ["qtypes"] as const,
  list: (section?: QtypeSection) =>
    section ? (["qtypes", section] as const) : qtypeKeys.all,
};

export function useQtypesQuery(section?: QtypeSection) {
  return useQuery({
    queryKey: qtypeKeys.list(section),
    queryFn: () => getQtypes({ section }),
  });
}
