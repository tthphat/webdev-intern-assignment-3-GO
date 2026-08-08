export const SUBJECTS = [
  { key: 'math', label: 'Math' },
  { key: 'literature', label: 'Literature' },
  { key: 'physics', label: 'Physics' },
  { key: 'chemistry', label: 'Chemistry' },
  { key: 'biology', label: 'Biology' },
  { key: 'history', label: 'History' },
  { key: 'geography', label: 'Geography' },
  { key: 'civicEducation', label: 'Civic Education' },
  { key: 'foreignLanguage', label: 'Foreign Language' },
] as const;

export type SubjectKey = (typeof SUBJECTS)[number]['key'];