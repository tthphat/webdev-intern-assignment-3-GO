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
        apiError.error?.message ?? "Unable to retrieve candidate score.",
      );
    }
  }

  return (
    <div className="candidate-search">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("registrationNumber")}
          placeholder="Enter registration number"
          inputMode="numeric"
          maxLength={8}
          disabled={isSubmitting}
        />

        {errors.registrationNumber && (
          <p role="alert">{errors.registrationNumber.message}</p>
        )}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Checking..." : "Check Score"}
        </button>
      </form>

      {serverError && <p role="alert">{serverError}</p>}

      {candidate && <CandidateScoreCard candidate={candidate} />}
    </div>
  );
}
