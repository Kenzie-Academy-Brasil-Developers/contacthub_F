import { z } from "zod"

export const schema = z.object({
    email: z.string().email("Por favor, preencha o campo de email corretamente"),
    password: z.string().min(4)
})

export type LoginSchema = z.infer<typeof schema>