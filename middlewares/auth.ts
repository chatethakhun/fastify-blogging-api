import { FastifyRequest, FastifyReply, DoneFuncWithErrOrRes } from "fastify"
import prisma from "../utils/prisma"

require('dotenv').config()

export async function auth(req: FastifyRequest, reply: FastifyReply, done: DoneFuncWithErrOrRes) {
  try {
    const token = req.headers.authorization

    if (!token) {
      return reply.status(401).send({ message: 'Unauthorized' })
    }

    const tokenResponse = token.split(' ')[1]

    const payload = await req.jwtVerify()

    if(!payload) {
      return reply.status(401).send({ message: 'Unauthorized' })
    }
    
    const user = await prisma.user.findUnique({
      where: {
        token: tokenResponse
      }
    })

    if (!user) {
      return reply.status(401).send({ message: 'Unauthorized' })
    }

    done()

  } catch (error) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }
}