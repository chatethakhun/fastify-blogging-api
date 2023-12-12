import { FastifyPluginAsync } from "fastify";
import prisma from "../../utils/prisma";


const routes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', async (req, reply) => {
  
    reply.send({ hello: 'world' });
  });
}

export default routes;