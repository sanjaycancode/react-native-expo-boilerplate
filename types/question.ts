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
