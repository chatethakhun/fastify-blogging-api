import { FastifyInstance } from "fastify";
import { createPostHandler, getAllPostsHandler } from "./post.controller";
import { auth } from "../../middlewares/auth";
async function postRoutes(fastify: FastifyInstance) {
  fastify.get('/posts', { preHandler: auth }, getAllPostsHandler);
  fastify.post('/posts', createPostHandler);
}

export default postRoutes;