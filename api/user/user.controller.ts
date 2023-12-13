import { FastifyRequest } from "fastify";
import { CreateUserInput } from "./user.schema";
import { signUp } from "./user.service";

export const signUpHandler = async (request: FastifyRequest<{
  Body: CreateUserInput
}>) => {
  const user = await signUp({
    ...request.body
  })
  return user;
}