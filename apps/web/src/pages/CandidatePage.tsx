import { CandidateSearch } from '@/features/candidate/components/CandidateSearch';

export function CandidatePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800">
        <h1 className="text-2xl font-bold text-slate-950 dark:text-slate-50">
          Candidate Score Inquiry
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm">
          Official system to look up the 2024 High School Graduation Exam scores quickly and accurately.
        </p>
      </div>

      <CandidateSearch />
    </div>
  );
}
