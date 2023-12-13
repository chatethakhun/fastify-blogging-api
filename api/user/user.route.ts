import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { signUpHandler } from "./user.controller";

const userRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/auth/signup', signUpHandler)
}

export default userRoutes;