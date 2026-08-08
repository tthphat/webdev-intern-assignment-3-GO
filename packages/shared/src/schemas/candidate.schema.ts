import { z } from "zod";

export const registrationNumberSchema = z
  .string()
  .regex(/^\d{7}$/, "Registration number must contain exactly 7 digits");

export type RegistrationNumberType = z.infer<typeof registrationNumberSchema>;
