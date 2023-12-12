import { FastifyInstance } from "fastify";
import { getAllPostsHandler } from "./post.controller";

async function postRoutes(fastify: FastifyInstance) {
  fastify.get('/posts', getAllPostsHandler);
}

export default postRoutes;