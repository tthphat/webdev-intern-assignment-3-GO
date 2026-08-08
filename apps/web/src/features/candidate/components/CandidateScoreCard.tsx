import { SUBJECTS, type Candidate } from '@score-analytics/shared';

interface CandidateScoreCardProps {
  candidate: Candidate;
}

export function CandidateScoreCard({
  candidate,
}: CandidateScoreCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-6 gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">
            Exam Score Results 2024
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            National High School Graduation Examination
          </p>
        </div>
        <div className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900/30 px-3 py-1.5 rounded">
          <span className="text-[10px] font-bold text-yellow-800 dark:text-yellow-400 uppercase tracking-wider">
            Registration No.
          </span>
          <strong className="text-base font-mono text-slate-900 dark:text-slate-100">
            {candidate.registrationNumber}
          </strong>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {SUBJECTS.map(({ key, label }) => {
          const score = candidate[key];
          return (
            <div
              key={key}
              className="flex flex-col items-center justify-center p-3 rounded bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
            >
              <span className="text-[11px] text-slate-500 dark:text-slate-400 text-center mb-1">
                {label}
              </span>
              <span className="text-xl font-mono font-semibold">
                {score !== null && score !== undefined ? score.toFixed(2) : '-'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
