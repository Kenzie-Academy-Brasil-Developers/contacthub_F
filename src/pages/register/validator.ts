import { z } from "zod";

export const schemaRegister = z.object({
  name: z.string().max(45),
  email: z.string().email(),
  password: z.string().max(120),
  contactNumber: z.string(),
});

export type RegisterSchema = z.infer<typeof schemaRegister>;
