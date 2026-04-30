import type { Course } from "@/types/course";
import type { CourseDetail } from "@/types/courseDetail";
import { apiClient } from "../client";

type ApiResponse<T> = {
  data: T;
};

export async function getCourses(): Promise<Course[]>  {
  const response = await apiClient.get<ApiResponse<Course[]>>("/courses");
  return response.data.data;
}

export async function getCourseById(id: number):Promise<CourseDetail>{
  const response = await apiClient.get<ApiResponse<CourseDetail>>(`/courses/${id}/`);
  return response.data.data;
}


