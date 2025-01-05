import { z } from "zod";

export const AcceptMessageSchemaZod = z.object({
  acceptMessage: z.boolean(),
});
