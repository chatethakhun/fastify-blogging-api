import { FastifyInstance } from "fastify";
import { createPostHandler, getAllPostsHandler } from "./post.controller";

async function postRoutes(fastify: FastifyInstance) {
  fastify.get('/posts', getAllPostsHandler);
  fastify.post('/posts', createPostHandler);
}

export default postRoutes;