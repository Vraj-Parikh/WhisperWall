import { z } from "zod";
import { passwordValidation } from "./SignUpSchema";

export const LoginSchemaZod = z.object({
  email: z.string().email("Invalid email address"),
  password: passwordValidation,
});
