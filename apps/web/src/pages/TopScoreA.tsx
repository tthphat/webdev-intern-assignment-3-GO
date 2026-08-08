import { TopGroupAList } from '@/features/analytics/components/TopGroupAList';

export function TopScoreA() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Top 10 Group A</h2>
        <p className="text-slate-600">The list of top 10 students in Group A (Math, Physics, Chemistry).</p>
      </div>
      <TopGroupAList />
    </div>
  );
}
