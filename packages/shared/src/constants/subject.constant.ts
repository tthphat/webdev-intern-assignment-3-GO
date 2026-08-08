import { SUBJECT_LABELS, SubjectCode } from './subject.enum.js';

export const SUBJECTS: { key: SubjectCode; label: string }[] = Object.values(
  SubjectCode,
).map((code) => ({ key: code, label: SUBJECT_LABELS[code] }));

export type SubjectKey = SubjectCode;