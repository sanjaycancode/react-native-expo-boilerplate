export const questionSections = [
  "listening",
  "reading",
  "writing",
  "speaking",
] as const;

export type QuestionSection = (typeof questionSections)[number];

export interface QuestionType {
  code: string;
  label: string;
  count: number;
  accuracy: number | null;
  attempted_questions: number;
  progress_pct: number;
}

export type QuestionTypesBySection = Partial<
  Record<QuestionSection, QuestionType[]>
>;

export interface GetQuestionTypesResponse {
  success: boolean;
  data: QuestionTypesBySection;
}

export interface Question {
  id: number;
  title: string;
  section: QuestionSection;
  difficulty: number | null;
  has_done: boolean;
  is_new: boolean;
}

export interface QuestionsMeta {
  page: number;
  limit: number;
  total: number;
}

export interface GetQuestionsResponse {
  success: boolean;
  data: Question[];
  meta: QuestionsMeta;
}
