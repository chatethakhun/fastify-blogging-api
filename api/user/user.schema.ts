import { z } from "zod";

export const userInput = {
  username: z.string(),
  password: z.string(),
}

export const createUserSchema = z.object({
  ...userInput
})
export type CreateUserInput = z.infer<typeof createUserSchema>