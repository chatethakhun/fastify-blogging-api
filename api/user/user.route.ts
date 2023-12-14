import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { signInHandler, signUpHandler } from "./user.controller";

const userRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/auth/signup', signUpHandler)
  fastify.post('/auth/signin', signInHandler)
}


export default userRoutes;