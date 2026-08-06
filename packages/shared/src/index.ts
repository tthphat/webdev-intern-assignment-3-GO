export const hello = "Hello Shared Package";

import { z } from "zod";

export const SearchCandidateSchema = z.object({
  registrationNumber: z.string().length(8),
});