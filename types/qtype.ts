export const qtypeSections = [
  "listening",
  "reading",
  "writing",
  "speaking",
] as const;

export type QtypeSection = (typeof qtypeSections)[number];

export interface Qtype {
  code: string;
  label: string;
  count: number;
  accuracy: number | null;
  attempted_questions: number;
  progress_pct: number;
}

export type QtypesBySection = Partial<Record<QtypeSection, Qtype[]>>;

export interface GetQtypesResponse {
  qtypes: QtypesBySection;
}
