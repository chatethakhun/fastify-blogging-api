import { FastifyRequest, FastifyReply } from "fastify"
import prisma from "../utils/prisma"

require('dotenv').config()

export async function auth(req: FastifyRequest, reply: FastifyReply){
  const token = req.headers.authorization

  if(!token){
    return reply.status(401).send({message: 'Unauthorized'})
  }

  const user = await prisma.user.findUnique({
    where: {
      token
    }
  })

  if(!user){ 
    return reply.status(401).send({message: 'Unauthorized'})
  }


  // req.user = user
}