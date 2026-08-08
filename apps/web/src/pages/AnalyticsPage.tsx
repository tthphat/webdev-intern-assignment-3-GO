import { Analytics } from '@/features/analytics/components/Analytics';

export function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Analytics Dashboard</h2>
        <p className="text-slate-600">Score distribution statistics and insights.</p>
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <Analytics />
      </div>
    </div>
  );
}
