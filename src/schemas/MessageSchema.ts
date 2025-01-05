import { z } from "zod";

export const MessageSchemaZod = z.object({
  message: z
    .string()
    .trim()
    .min(1, "Message must not be empty")
    .max(300, "Message must be at most 300 characters long"),
});
