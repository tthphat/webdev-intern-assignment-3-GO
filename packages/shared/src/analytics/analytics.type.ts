export interface TopGroupACandidate {
  registrationNumber: string;
  math: number;
  physics: number;
  chemistry: number;
  totalScore: number;
}

export interface ScoreDistribution {
  subject: string;
  above8: number;
  from6To8: number;
  from4To6: number;
  below4: number;
  total: number;
}
