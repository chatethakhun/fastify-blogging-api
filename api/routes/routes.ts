import { FastifyPluginAsync } from "fastify";


const routes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', async (req, reply) => {
    reply.send({ hello: 'world' });
  });
}

export default routes;