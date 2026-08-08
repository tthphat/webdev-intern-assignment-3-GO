import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { Candidate } from "@score-analytics/shared";

import { getCandidate } from "../api/candidate.api.ts";
import {
  type RegistrationNumberParams,
  registrationNumberSchema,
} from "@score-analytics/shared";
import { CandidateScoreCard } from "./CandidateScoreCard";
import { Spinner } from "../../../components/ui/Spinner";

export function CandidateSearch() {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationNumberParams>({
    resolver: zodResolver(registrationNumberSchema),
  });

  async function onSubmit(data: RegistrationNumberParams) {
    setCandidate(null);
    setServerError(null);

    try {
      const candidate = await getCandidate(data.registrationNumber);
      setCandidate(candidate);
    } catch (error) {
      const apiError = error as {
        error?: {
          code?: string;
          message?: string;
        };
      };

      setServerError(
        apiError.error?.message ?? "Candidate not found or server error occurred.",
      );
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Registration Number
            </label>
            <div className="flex gap-2">
              <input
                {...register("registrationNumber")}
                type="text"
                placeholder="Enter 8-digit code (e.g. 01000001)"
                inputMode="numeric"
                maxLength={8}
                disabled={isSubmitting}
                className="flex-1 px-3 py-2 bg-white dark:bg-slate-800 text-slate-950 dark:text-slate-50 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 font-mono text-sm"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors disabled:opacity-75 cursor-pointer text-sm flex items-center gap-1.5"
              >
                {isSubmitting ? (
                  <>
                    <Spinner className="text-white" />
                    <span>{isSubmitting ? "Checking..." : "Search"}</span>
                  </>
                ) : (
                  "Search"
                )}
              </button>
            </div>
          </div>

          {errors.registrationNumber && (
            <p className="text-xs text-red-600 dark:text-red-400" role="alert">
              {errors.registrationNumber.message}
            </p>
          )}
        </form>

        {serverError && (
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-md text-xs" role="alert">
            {serverError}
          </div>
        )}
      </div>

      {candidate && <CandidateScoreCard candidate={candidate} />}
    </div>
  );
}
