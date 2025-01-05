import { z } from "zod";
import { passwordValidation } from "./SignUpSchema";

export const LoginSchemaZod = z.object({
  identifier: z.string().email("Invalid email address"),
  password: passwordValidation,
});
