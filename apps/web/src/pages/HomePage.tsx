import { Link } from 'react-router-dom';

const FEATURES = [
  {
    to: '/candidate',
    title: 'Candidate Search',
    description:
      'Look up individual exam scores by registration number.',
  },
  {
    to: '/top-score-a',
    title: 'Top 10 Group A',
    description:
      'Ranking of top students in Group A (Math, Physics, Chemistry).',
  },
  {
    to: '/analytics',
    title: 'Score Distribution',
    description:
      'See how scores are distributed across all subjects.',
  },
];

export function HomePage() {
  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-xl bg-blue-950 text-white p-8 sm:p-12">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-700/40 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-blue-600/30 blur-3xl" />

        <div className="relative">
          <p className="mb-3 inline-block rounded-full bg-yellow-400 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-blue-950">
            Vietnam High School Graduation Exam 2024
          </p>
          <h1 className="mt-4 mb-3 text-3xl sm:text-4xl font-bold text-yellow-400">
            Score Analytics
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-blue-100">
            Explore national exam results. Check individual scores, browse the
            top 10 in Group A, and analyze score distributions across subjects.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(({ to, title, description }) => (
          <Link
            key={to}
            to={to}
            className="group rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm transition-all hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700"
          >
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {title}
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {description}
            </p>
            <span className="mt-3 inline-block text-xs font-semibold text-blue-600 dark:text-blue-400">
              Open feature →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}