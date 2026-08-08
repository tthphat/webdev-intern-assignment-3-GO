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

export type ScoreDistributionRow = {
  mathAbove8: bigint;
  mathFrom6To8: bigint;
  mathFrom4To6: bigint;
  mathBelow4: bigint;
  mathTotal: bigint;

  literatureAbove8: bigint;
  literatureFrom6To8: bigint;
  literatureFrom4To6: bigint;
  literatureBelow4: bigint;
  literatureTotal: bigint;

  physicsAbove8: bigint;
  physicsFrom6To8: bigint;
  physicsFrom4To6: bigint;
  physicsBelow4: bigint;
  physicsTotal: bigint;

  chemistryAbove8: bigint;
  chemistryFrom6To8: bigint;
  chemistryFrom4To6: bigint;
  chemistryBelow4: bigint;
  chemistryTotal: bigint;

  biologyAbove8: bigint;
  biologyFrom6To8: bigint;
  biologyFrom4To6: bigint;
  biologyBelow4: bigint;
  biologyTotal: bigint;

  historyAbove8: bigint;
  historyFrom6To8: bigint;
  historyFrom4To6: bigint;
  historyBelow4: bigint;
  historyTotal: bigint;

  geographyAbove8: bigint;
  geographyFrom6To8: bigint;
  geographyFrom4To6: bigint;
  geographyBelow4: bigint;
  geographyTotal: bigint;

  civicEducationAbove8: bigint;
  civicEducationFrom6To8: bigint;
  civicEducationFrom4To6: bigint;
  civicEducationBelow4: bigint;
  civicEducationTotal: bigint;

  foreignLanguageAbove8: bigint;
  foreignLanguageFrom6To8: bigint;
  foreignLanguageFrom4To6: bigint;
  foreignLanguageBelow4: bigint;
  foreignLanguageTotal: bigint;
};
