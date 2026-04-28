import { useQuery } from "@tanstack/react-query";

import { getCourseById, getCourses } from "@/api/services/courseService";
import type { Course } from "@/types/course";
import type { CourseDetail } from "@/types/courseDetail";

// Query keys (VERY IMPORTANT)
export const courseKeys = {
    all: ["courses"] as const,
    detail: (id: number) => ["courses", id] as const,
}

export function useCoursesQuery() {
  return useQuery<Course[]>({
    queryKey: courseKeys.all,
    queryFn: getCourses,
  });
}

export function useCourseQuery(id: number) {
  return useQuery<CourseDetail>({
    queryKey: courseKeys.detail(id),
    queryFn: () => getCourseById(id),
    enabled: id > 0, // prevents API call if id is invalid
  });
}
