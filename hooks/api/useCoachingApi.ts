import { useQuery } from "@tanstack/react-query";

import { getCoachingTeachers, getTeacherOfferings } from "@/api/services";

export const coachingKeys = {
  all: ["coaching"] as const,
  teachers: () => ["coaching", "teachers"] as const,
  offerings: (teacherId: string | number) =>
    ["coaching", "teachers", String(teacherId), "offerings"] as const,
};

export function useCoachingTeachersQuery() {
  return useQuery({
    queryKey: coachingKeys.teachers(),
    queryFn: getCoachingTeachers,
  });
}

export function useTeacherOfferingsQuery(teacherId?: string | number) {
  return useQuery({
    queryKey: coachingKeys.offerings(teacherId ?? ""),
    queryFn: () => getTeacherOfferings(teacherId ?? ""),
    enabled: Boolean(teacherId),
  });
}
