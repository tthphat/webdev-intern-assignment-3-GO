import { z } from "zod";

export const registrationNumberSchema = z.object({
  registrationNumber: z.string().regex(/^\d{8}$/, "Registration number must contain 8 digits")
});

export type RegistrationNumberParams = z.infer<typeof registrationNumberSchema>;
