import type { Candidate } from '@score-analytics/shared';

interface CandidateScoreCardProps {
  candidate: Candidate;
}

export function CandidateScoreCard({
  candidate,
}: CandidateScoreCardProps) {
  return (
    <div className="candidate-score-card">
      <div>
        <span>Registration Number</span>
        <strong>{candidate.registrationNumber}</strong>
      </div>

      <div>
        <span>Math</span>
        <strong>{candidate.math ?? '-'}</strong>
      </div>

      <div>
        <span>Literature</span>
        <strong>{candidate.literature ?? '-'}</strong>
      </div>

      <div>
        <span>Physics</span>
        <strong>{candidate.physics ?? '-'}</strong>
      </div>

      <div>
        <span>Chemistry</span>
        <strong>{candidate.chemistry ?? '-'}</strong>
      </div>

      <div>
        <span>Biology</span>
        <strong>{candidate.biology ?? '-'}</strong>
      </div>

      <div>
        <span>History</span>
        <strong>{candidate.history ?? '-'}</strong>
      </div>

      <div>
        <span>Geography</span>
        <strong>{candidate.geography ?? '-'}</strong>
      </div>

      <div>
        <span>Civic Education</span>
        <strong>{candidate.civicEducation ?? '-'}</strong>
      </div>

      <div>
        <span>Foreign Language</span>
        <strong>{candidate.foreignLanguage ?? '-'}</strong>
      </div>
    </div>
  );
}
