import { useEffect, useState } from 'react';
import type { TopGroupACandidate } from '@score-analytics/shared';

import { getTopGroupA } from '../api/analytics.api';
import { Spinner } from '../../../components/ui/Spinner';

interface RankedCandidate extends TopGroupACandidate {
  rank: number;
}

export function TopGroupAList() {
  const [candidates, setCandidates] = useState<RankedCandidate[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    getTopGroupA()
      .then((data) => {
        if (cancelled) return;
        setCandidates(
          data.map((candidate, index) => ({ ...candidate, rank: index + 1 })),
        );
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const apiError = err as { error?: { message?: string } };
        setError(
          apiError.error?.message ?? 'Failed to load top group A candidates.',
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

  if (candidates === null) {
    return (
      <div className="flex items-center justify-center gap-2 py-12 text-slate-500 dark:text-slate-400">
        <Spinner />
        <span className="text-sm">Loading top candidates...</span>
      </div>
    );
  }

  if (candidates.length === 0) {
    return (
      <p className="text-sm text-slate-500 dark:text-slate-400 py-6">
        No candidates available.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-300 dark:border-slate-600">
            <th className="py-3 pr-4 font-bold">Rank</th>
            <th className="py-3 pr-4 font-bold">Registration No.</th>
            <th className="py-3 pr-4 font-bold text-right">Math</th>
            <th className="py-3 pr-4 font-bold text-right">Physics</th>
            <th className="py-3 pr-4 font-bold text-right">Chemistry</th>
            <th className="py-3 font-bold text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map(({ rank, registrationNumber, math, physics, chemistry, totalScore }) => (
            <tr
              key={registrationNumber}
              className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <td className="py-2.5 pl-4 pr-4">
                <span
                  className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                    rank === 1
                      ? 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300'
                      : rank === 2
                        ? 'bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200'
                        : rank === 3
                          ? 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {rank}
                </span>
              </td>
              <td className="py-2.5 pr-4 font-mono text-slate-900 dark:text-slate-100">
                {registrationNumber}
              </td>
              <td className="py-2.5 pr-4 text-right font-mono">{math.toFixed(2)}</td>
              <td className="py-2.5 pr-4 text-right font-mono">{physics.toFixed(2)}</td>
              <td className="py-2.5 pr-4 text-right font-mono">{chemistry.toFixed(2)}</td>
              <td className="py-2.5 font-mono font-semibold text-blue-600 dark:text-blue-400 text-right">
                {totalScore.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}