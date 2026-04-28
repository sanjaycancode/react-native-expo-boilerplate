export interface Lesson {
  id: number;
  title: string;
  type: string;
  is_completed: boolean;
  duration_minutes: number;
}

export interface Module {
  id: number;
  title: string;
  summary: string;
  lessons: Lesson[];
}

export interface CourseDetail {
  id: number;
  title: string;
  image: string;
  short_description: string;
  progress: number;
  is_complete: boolean;
  modules: Module[];
}
