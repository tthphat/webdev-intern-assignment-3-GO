export enum SubjectCode {
  Math = 'math',
  Literature = 'literature',
  Physics = 'physics',
  Chemistry = 'chemistry',
  Biology = 'biology',
  History = 'history',
  Geography = 'geography',
  CivicEducation = 'civicEducation',
  ForeignLanguage = 'foreignLanguage',
}

export const SUBJECT_LABELS: Record<SubjectCode, string> = {
  [SubjectCode.Math]: 'Math',
  [SubjectCode.Literature]: 'Literature',
  [SubjectCode.Physics]: 'Physics',
  [SubjectCode.Chemistry]: 'Chemistry',
  [SubjectCode.Biology]: 'Biology',
  [SubjectCode.History]: 'History',
  [SubjectCode.Geography]: 'Geography',
  [SubjectCode.CivicEducation]: 'Civic Education',
  [SubjectCode.ForeignLanguage]: 'Foreign Language',
};