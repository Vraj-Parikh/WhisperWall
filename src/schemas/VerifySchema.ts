import { z } from "zod";

export const VerifySchemaZod = z.object({
  verificationCode: z
    .string()
    .length(6, "Verification code must be 6 characters long"),
});
