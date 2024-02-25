import { z } from "zod";

export const schemaContact = z.object({
  id: z.number(),
  name: z.string().max(45),
  email: z.string().email(),
  contactNumber: z.string(),
  createdAt: z.string(),
});

export type ContactSchema = z.infer<typeof schemaContact>;
