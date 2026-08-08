import { useEffect, useState } from 'react';
import { SUBJECTS, type ScoreDistribution } from '@score-analytics/shared';

import { getScoreDistribution } from '../api/analytics.api';
import { Spinner } from '../../../components/ui/Spinner';

type BandKey = 'above8' | 'from6To8' | 'from4To6' | 'below4';

const BANDS: { key: BandKey; label: string; color: string }[] = [
  { key: 'above8', label: '>= 8', color: 'bg-emerald-500' },
  { key: 'from6To8', label: '6 - 8', color: 'bg-blue-500' },
  { key: 'from4To6', label: '4 - 6', color: 'bg-amber-500' },
  { key: 'below4', label: '< 4', color: 'bg-red-500' },
];

function subjectLabel(subject: string): string {
  return SUBJECTS.find((s) => s.key === subject)?.label ?? subject;
}

function bandValue(row: ScoreDistribution, key: BandKey): number {
  return row[key];
}

function Legend() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {BANDS.map(({ key, label, color }) => (
        <span
          key={key}
          className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300"
        >
          <span className={`inline-block h-2.5 w-2.5 rounded-sm ${color}`} />
          {label}
        </span>
      ))}
    </div>
  );
}

function SubjectBarChart({ row }: { row: ScoreDistribution }) {
  const { total, subject } = row;
  const subjectName = subjectLabel(subject);
  const maxBand = Math.max(...BANDS.map(({ key }) => bandValue(row, key)), 1);

  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold text-slate-800 dark:text-slate-100">
        {subjectName}
        <span className="ml-2 text-xs font-normal text-slate-400 dark:text-slate-500">
          Total: {total}
        </span>
      </h3>

      <div className="flex h-40 items-stretch gap-2">
        {BANDS.map(({ key, label, color }) => {
          const value = bandValue(row, key);
          const height = (value / maxBand) * 100;

          return (
            <div key={key} className="flex flex-1 flex-col items-center gap-1">
              <span className="text-xs font-semibold font-mono text-slate-700 dark:text-slate-300">
                {value}
              </span>
              <div className="flex w-full flex-1 items-end">
                <div
                  className={`w-full rounded-t ${color}`}
                  style={{ height: `${height}%` }}
                  title={`${subjectName} ${label}: ${value}`}
                />
              </div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AggregateChart({ rows, maxTotal }: { rows: ScoreDistribution[]; maxTotal: number }) {
  return (
    <div className="hidden rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm sm:block">
      <h3 className="mb-4 text-sm font-semibold text-slate-800 dark:text-slate-100">
        Overview - All Subjects
      </h3>

      <div className="space-y-4">
        {rows.map((row) => {
          const { total } = row;
          const label = subjectLabel(row.subject);

          return (
            <div
              key={row.subject}
              className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3"
            >
              <div className="flex w-full items-center justify-between gap-2 sm:w-36 sm:shrink-0 sm:justify-start">
                <span className="truncate text-sm font-medium text-slate-700 dark:text-slate-300">
                  {label}
                </span>
                <span className="shrink-0 text-right text-sm font-semibold font-mono text-slate-900 dark:text-slate-100 sm:hidden">
                  {total}
                </span>
              </div>

              <div className="flex h-6 w-full flex-1 overflow-hidden rounded-md bg-slate-100 dark:bg-slate-800">
                {BANDS.map(({ key, color }) => {
                  const value = bandValue(row, key);
                  if (value === 0) return null;

                  const percent = (value / maxTotal) * 100;

                  return (
                    <div
                      key={key}
                      className={`flex items-center justify-center ${color}`}
                      style={{ width: `${percent}%` }}
                      title={`${label} ${key}: ${value}`}
                    >
                      {percent >= 10 && (
                        <span className="text-[10px] font-semibold text-white">
                          {value}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <span className="hidden w-14 shrink-0 text-right text-sm font-semibold font-mono text-slate-900 dark:text-slate-100 sm:block">
                {total}
              </span>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">
        Segment width is relative to the largest subject total ({maxTotal}).
      </p>
    </div>
  );
}

export function ScoreDistributionChart() {
  const [rows, setRows] = useState<ScoreDistribution[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    getScoreDistribution()
      .then((data) => {
        if (cancelled) return;
        setRows(data);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const apiError = err as { error?: { message?: string } };
        setError(
          apiError.error?.message ?? 'Failed to load score distribution.',
        );
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <div
        className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-md text-xs p-3"
        role="alert"
      >
        {error}
      </div>
    );
  }

  if (rows === null) {
    return (
      <div className="flex items-center justify-center gap-2 py-12 text-slate-500 dark:text-slate-400">
        <Spinner />
        <span className="text-sm">Loading score distribution...</span>
      </div>
    );
  }

  const maxTotal = Math.max(...rows.map((row) => row.total), 1);

  return (
    <div className="space-y-6">
      <Legend />

      <div>
        <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Per Subject
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((row) => (
            <SubjectBarChart key={row.subject} row={row} />
          ))}
        </div>
      </div>

      <AggregateChart rows={rows} maxTotal={maxTotal} />
    </div>
  );
}