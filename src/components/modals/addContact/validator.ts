import { z } from "zod";

export const schema = z.object({
  name: z.string(),
  email: z.string(),
  contactNumber: z.string(),
});

export type CreateContact = z.infer<typeof schema>;
