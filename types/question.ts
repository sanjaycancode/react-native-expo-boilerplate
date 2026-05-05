export const questionSections = [
  "listening",
  "reading",
  "writing",
  "speaking",
] as const;

export type QuestionSection = (typeof questionSections)[number];

export const flowChartQuestionTypeCodes = [
  "ielts_listening_flow_chart_completion",
  "ielts_reading_flow_chart_completion",
] as const;

export const completionQuestionTypeCodes = [
  "ielts_listening_completion",
  "ielts_listening_form_completion",
  "ielts_listening_note_completion",
  "ielts_listening_sentence_completion",
  "ielts_listening_short_answer",
  "ielts_reading_note_completion",
  "ielts_reading_sentence_completion",
  "ielts_reading_short_answer",
  "pte_fill_blanks_reading",
  "pte_listening_fill_blanks",
  "pte_reading_writing_fill_blanks",
] as const;

export const multipleChoiceQuestionTypeCodes = [
  "ielts_listening_mcq",
  "ielts_listening_mcq_multiple",
  "ielts_listening_mcq_single",
  "ielts_reading_mcq_multiple",
  "ielts_reading_mcq_single",
  "pte_highlight_correct_summary",
  "pte_listening_multiple_choice_multiple",
  "pte_listening_multiple_choice_single",
  "pte_multiple_choice_multiple",
  "pte_multiple_choice_single",
  "pte_select_missing_word",
] as const;

export const matchingQuestionTypeCodes = [
  "ielts_listening_matching",
  "ielts_reading_matching_endings",
  "ielts_reading_matching_features",
  "ielts_reading_matching_headings",
  "ielts_reading_matching_info",
  "ielts_reading_tf_ng",
  "ielts_reading_yn_ng",
] as const;

export const tableCompletionQuestionTypeCodes = [
  "ielts_listening_table_completion",
  "ielts_reading_table_completion",
] as const;

export const mapDiagramQuestionTypeCodes = [
  "ielts_listening_plan_map_diagram",
] as const;

export const diagramLabelQuestionTypeCodes = [
  "ielts_reading_diagram_label",
] as const;

export const reorderParagraphsQuestionTypeCodes = [
  "pte_reorder_paragraphs",
] as const;

export const highlightIncorrectWordsQuestionTypeCodes = [
  "pte_highlight_incorrect_words",
] as const;

export const speakingQuestionTypeCodes = [
  "ielts_speaking_part1",
  "ielts_speaking_part2",
  "ielts_speaking_part3",
] as const;

export const writingQuestionTypeCodes = [
  "ielts_writing_task1_academic",
  "ielts_writing_task1_general",
  "ielts_writing_task2",
  "pte_essay",
  "pte_summarize_written_text",
  "ptecore_writing_email",
] as const;

export const textPromptQuestionTypeCodes = [
  "pte_read_aloud",
  "pte_speaking_personal_introduction",
] as const;

export const audioPromptQuestionTypeCodes = [
  "pte_answer_short_question",
  "pte_repeat_sentence",
  "pte_respond_to_a_situation",
  "pte_retell_lecture",
  "pte_summarize_group_discussion",
  "pte_summarize_spoken_text",
  "pte_write_from_dictation",
  "ptecore_speaking_respond_to_situation",
] as const;

export const imagePromptQuestionTypeCodes = [
  "pte_describe_image",
] as const;

export const questionTypeCodes = [
  ...flowChartQuestionTypeCodes,
  ...completionQuestionTypeCodes,
  ...multipleChoiceQuestionTypeCodes,
  ...matchingQuestionTypeCodes,
  ...tableCompletionQuestionTypeCodes,
  ...mapDiagramQuestionTypeCodes,
  ...diagramLabelQuestionTypeCodes,
  ...reorderParagraphsQuestionTypeCodes,
  ...highlightIncorrectWordsQuestionTypeCodes,
  ...speakingQuestionTypeCodes,
  ...writingQuestionTypeCodes,
  ...textPromptQuestionTypeCodes,
  ...audioPromptQuestionTypeCodes,
  ...imagePromptQuestionTypeCodes,
] as const;

export type QuestionTypeCode = (typeof questionTypeCodes)[number];
export type FlowChartQuestionTypeCode =
  (typeof flowChartQuestionTypeCodes)[number];

const questionTypeCodeSet = new Set<string>(questionTypeCodes);

export function isQuestionTypeCode(value: string): value is QuestionTypeCode {
  return questionTypeCodeSet.has(value);
}

export interface ApiResponse<TData> {
  success: boolean;
  data: TData;
}

export interface PaginatedApiResponse<TData, TMeta>
  extends ApiResponse<TData> {
  meta: TMeta;
}

export interface QuestionType {
  code: QuestionTypeCode;
  label: string;
  count: number;
  accuracy: number | null;
  attempted_questions: number;
  progress_pct: number;
}

export type QuestionTypesBySection = Partial<
  Record<QuestionSection, QuestionType[]>
>;

export type GetQuestionTypesResponse = ApiResponse<QuestionTypesBySection>;

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

export type GetQuestionsResponse = PaginatedApiResponse<Question[], QuestionsMeta>;

export interface PracticeInstructions {
  preparation_time?: number | null;
  response_time?: number | null;
  word_limit?: number | null;
}

export interface QuestionTypeReference<TCode extends QuestionTypeCode> {
  code: TCode;
  label: string;
}

export interface BaseQuestionDetail<
  TCode extends QuestionTypeCode,
  TContent extends CommonPracticeContent,
> {
  id: number;
  title: string;
  prompt: string;
  section: QuestionSection;
  difficulty: number | null;
  target_score: number | null;
  is_active: boolean;
  has_done: boolean;
  is_new: boolean;
  question_type: QuestionTypeReference<TCode>;
  practice: {
    instructions: PracticeInstructions;
    content: TContent;
  };
}

export interface PracticeAssets {
  audio_url?: string | null;
  image_url?: string | null;
}

export interface PracticeOption {
  label: string;
  text: string;
}

export interface PracticeCoords {
  x?: number | string | null;
  y?: number | string | null;
  w?: number | string | null;
  h?: number | string | null;
  page_index?: number | null;
}

export interface PracticeItem {
  item_id: number;
  order?: number | null;
  prompt?: string;
  display_text?: string;
  word_limit?: number | null;
  max_select?: number | null;
  coords?: PracticeCoords;
  options?: PracticeOption[];
}

export interface PracticeBlank {
  blank_number?: number | null;
  item_id?: number | null;
  order?: number | null;
  prompt?: string;
  word_limit?: number | null;
  start?: number | null;
  end?: number | null;
  label?: string;
  placeholder?: string;
}

export interface CommonPracticeContent {
  assets?: PracticeAssets;
  passage?: string;
  text?: string;
  word_bank?: string[];
  options?: PracticeOption[];
}

export interface FlowChartPracticeContent extends CommonPracticeContent {
  flowchart: {
    steps: Array<{
      step_index: number;
      text: string;
      blanks: Array<{
        blank_number: number;
        item_id: number | null;
        position?: number | null;
      }>;
    }>;
    blank_count: number | null;
  };
}

export interface TableCompletionPracticeContent
  extends CommonPracticeContent {
  table: {
    content?: string;
    blanks: PracticeBlank[];
  };
}

export interface MapDiagramPracticeContent extends CommonPracticeContent {
  map: {
    markers: Array<{
      label?: string;
      x?: number | string | null;
      y?: number | string | null;
    }>;
    questions: PracticeItem[];
  };
}

export interface DiagramLabelPracticeContent extends CommonPracticeContent {
  diagram: {
    labels: PracticeItem[];
  };
}

export interface MultipleChoicePracticeContent extends CommonPracticeContent {
  items: PracticeItem[];
}

export interface MatchingPracticeContent extends CommonPracticeContent {
  items: PracticeItem[];
}

export interface CompletionPracticeContent extends CommonPracticeContent {
  blanks: PracticeBlank[];
}

export interface ReorderParagraphsPracticeContent
  extends CommonPracticeContent {
  paragraphs: Array<{
    id: number | string;
    text: string;
  }>;
}

export interface HighlightIncorrectWordsPracticeContent
  extends CommonPracticeContent {
  transcript: {
    words: Array<{
      index: number;
      text: string;
    }>;
  };
}

export interface SpeakingPracticeContent extends CommonPracticeContent {
  speaking: {
    cue_card?: string;
    questions?: Array<{
      item_id?: number | null;
      order?: number | null;
      text: string;
    }>;
  };
}

export interface WritingPracticeContent extends CommonPracticeContent {
  writing: {
    task: string;
    min_words?: number | null;
    time_limit?: number | null;
  };
}

export interface TextPromptPracticeContent extends CommonPracticeContent {
  text: string;
}

export interface AudioPromptPracticeContent extends CommonPracticeContent {
  assets: PracticeAssets;
  text?: string;
}

export interface ImagePromptPracticeContent extends CommonPracticeContent {
  assets: PracticeAssets;
  items?: PracticeItem[];
}

type FlowChartQuestionDetailByCode = {
  [K in FlowChartQuestionTypeCode]: BaseQuestionDetail<
    K,
    FlowChartPracticeContent
  >;
};

type CompletionQuestionDetailByCode = {
  [K in (typeof completionQuestionTypeCodes)[number]]: BaseQuestionDetail<
    K,
    CompletionPracticeContent
  >;
};

type MultipleChoiceQuestionDetailByCode = {
  [K in (typeof multipleChoiceQuestionTypeCodes)[number]]: BaseQuestionDetail<
    K,
    MultipleChoicePracticeContent
  >;
};

type MatchingQuestionDetailByCode = {
  [K in (typeof matchingQuestionTypeCodes)[number]]: BaseQuestionDetail<
    K,
    MatchingPracticeContent
  >;
};

type TableCompletionQuestionDetailByCode = {
  [K in (typeof tableCompletionQuestionTypeCodes)[number]]: BaseQuestionDetail<
    K,
    TableCompletionPracticeContent
  >;
};

type MapDiagramQuestionDetailByCode = {
  [K in (typeof mapDiagramQuestionTypeCodes)[number]]: BaseQuestionDetail<
    K,
    MapDiagramPracticeContent
  >;
};

type DiagramLabelQuestionDetailByCode = {
  [K in (typeof diagramLabelQuestionTypeCodes)[number]]: BaseQuestionDetail<
    K,
    DiagramLabelPracticeContent
  >;
};

type ReorderParagraphsQuestionDetailByCode = {
  [K in (typeof reorderParagraphsQuestionTypeCodes)[number]]: BaseQuestionDetail<
    K,
    ReorderParagraphsPracticeContent
  >;
};

type HighlightIncorrectWordsQuestionDetailByCode = {
  [K in (typeof highlightIncorrectWordsQuestionTypeCodes)[number]]: BaseQuestionDetail<
    K,
    HighlightIncorrectWordsPracticeContent
  >;
};

type SpeakingQuestionDetailByCode = {
  [K in (typeof speakingQuestionTypeCodes)[number]]: BaseQuestionDetail<
    K,
    SpeakingPracticeContent
  >;
};

type WritingQuestionDetailByCode = {
  [K in (typeof writingQuestionTypeCodes)[number]]: BaseQuestionDetail<
    K,
    WritingPracticeContent
  >;
};

type TextPromptQuestionDetailByCode = {
  [K in (typeof textPromptQuestionTypeCodes)[number]]: BaseQuestionDetail<
    K,
    TextPromptPracticeContent
  >;
};

type AudioPromptQuestionDetailByCode = {
  [K in (typeof audioPromptQuestionTypeCodes)[number]]: BaseQuestionDetail<
    K,
    AudioPromptPracticeContent
  >;
};

type ImagePromptQuestionDetailByCode = {
  [K in (typeof imagePromptQuestionTypeCodes)[number]]: BaseQuestionDetail<
    K,
    ImagePromptPracticeContent
  >;
};

export type QuestionDetailByCode = FlowChartQuestionDetailByCode &
  CompletionQuestionDetailByCode &
  MultipleChoiceQuestionDetailByCode &
  MatchingQuestionDetailByCode &
  TableCompletionQuestionDetailByCode &
  MapDiagramQuestionDetailByCode &
  DiagramLabelQuestionDetailByCode &
  ReorderParagraphsQuestionDetailByCode &
  HighlightIncorrectWordsQuestionDetailByCode &
  SpeakingQuestionDetailByCode &
  WritingQuestionDetailByCode &
  TextPromptQuestionDetailByCode &
  AudioPromptQuestionDetailByCode &
  ImagePromptQuestionDetailByCode;

export type QuestionDetailFor<TCode extends QuestionTypeCode> =
  QuestionDetailByCode[TCode];

export type QuestionDetail = QuestionDetailByCode[QuestionTypeCode];

export type GetQuestionDetailResponse = ApiResponse<QuestionDetail>;

export interface PracticeCheckAnswer {
  item_id: number;
  answer: string;
}

interface PracticeCheckRequestBase {
  confidence?: number;
  answer_duration_ms?: number;
}

export interface PracticeCheckAnswersRequest
  extends PracticeCheckRequestBase {
  answers: PracticeCheckAnswer[];
  selected_options?: never;
  answer_text?: never;
}

export interface PracticeCheckSelectedOptionsRequest
  extends PracticeCheckRequestBase {
  answers?: never;
  selected_options: string[];
  answer_text?: never;
}

export interface PracticeCheckTextRequest extends PracticeCheckRequestBase {
  answers?: never;
  selected_options?: never;
  answer_text: string;
}

export type PracticeCheckRequest =
  | PracticeCheckAnswersRequest
  | PracticeCheckSelectedOptionsRequest
  | PracticeCheckTextRequest;

export interface PracticeCheckFeedbackItem {
  item_id: number | null;
  blank_number: number | null;
  user_answer: string;
  correct_answer: string;
  is_correct: boolean;
  score: number;
}

export type PracticeCheckResponse = ApiResponse<{
  question_id: number;
  attempt_id: number;
  is_correct: boolean;
  score: number;
  max_score: number;
  accuracy: number;
  explanation: string;
  feedback: PracticeCheckFeedbackItem[];
}>;

export type QuestionSortBy = "id" | "difficulty";
export type QuestionSortDir = "asc" | "desc";

export interface GetQuestionsParams {
  questionType?: QuestionTypeCode;
  questionTypes?: QuestionTypeCode[];
  search?: string;
  difficultyMin?: number;
  difficultyMax?: number;
  sortBy?: QuestionSortBy;
  sortDir?: QuestionSortDir;
  page?: number;
  limit?: number;
}
