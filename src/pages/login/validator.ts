import { z } from "zod";

export const schemaLogin = z.object({
  email: z.string().email("Por favor, preencha o campo de email corretamente"),
  password: z.string().min(4),
});

export type LoginSchema = z.infer<typeof schemaLogin>;
