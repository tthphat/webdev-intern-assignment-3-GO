import { CandidateSearch } from '../features/candidate/components/CandidateSearch';

export function CandidatePage() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Check Your Score</h2>
        <CandidateSearch />
      </div>
    </div>
  );
}
