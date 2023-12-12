import { FastifyPluginAsync } from "fastify";

const routes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/posts", async(req, reply) => {
      reply.send({ 
        message: "Hello World!"
      })
  })
}

export default routes;