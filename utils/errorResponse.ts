import { FastifyReply } from "fastify";

export const throwErrorMessage = (code: string , reply: FastifyReply) => {
  console.log({ code });
  
  if (code === 'P2025') {
    reply.code(404)
    throw new Error('Record not found')
  }

  reply.code(500)

  throw new Error('Server error')
};