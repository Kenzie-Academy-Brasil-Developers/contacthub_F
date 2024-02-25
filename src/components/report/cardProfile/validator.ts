import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  name: z.string().max(45),
  email: z.string().email(),
  password: z.string().max(120),
  contactNumber: z.string(),
  createdAt: z.string(),
});

export type UserSchema = z.infer<typeof userSchema>;
