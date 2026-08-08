export const SUBJECTS = [
  { key: 'math', label: 'Toán' },
  { key: 'literature', label: 'Ngữ văn' },
  { key: 'physics', label: 'Vật lý' },
  { key: 'chemistry', label: 'Hóa học' },
  { key: 'biology', label: 'Sinh học' },
  { key: 'history', label: 'Lịch sử' },
  { key: 'geography', label: 'Địa lý' },
  { key: 'civicEducation', label: 'Giáo dục công dân' },
  { key: 'foreignLanguage', label: 'Ngoại ngữ' },
] as const;

export type SubjectKey = (typeof SUBJECTS)[number]['key'];