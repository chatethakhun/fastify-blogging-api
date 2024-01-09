import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserInput } from "./user.schema";
import { signUp } from "./user.service";
import prisma from "../../utils/prisma";
import { compare } from "bcryptjs";

export const signUpHandler = async (request: FastifyRequest<{
  Body: CreateUserInput
}>) => {
  const user = await signUp({
    ...request.body,
  })
  return user;
}

export const signInHandler = async (request: FastifyRequest<{
  Body: CreateUserInput
}>, reply: FastifyReply) => {
  try {
    const username = request.body.username
    const password = request.body.password

    const user = await prisma.user.findUnique({
      where: {
        username
      }
    })

    if (!user) {
      throw new Error('User not found')
    }

    const isMatch = await compare(password, user.password)

    if (!isMatch) {
      throw new Error('Invalid password')
    }

    const token = await request.server.jwt.sign({ username: user.username, name: user.name, createdAt: user.createdAt, id: user.id }, { expiresIn: 3600 })


    const newUser = await prisma.user.update({
      where: {
        username: user.username
      },
      data: {
        token: token
      }
    })

    return {
      id: user.id,
      username: newUser.username,
      name: newUser.name,
      createdAt: newUser.createdAt,
      token: newUser.token
    }


  } catch (error: Error | unknown) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }
}