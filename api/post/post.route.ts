import { FastifyInstance } from "fastify";
import { createPostHandler, getAllPostsHandler, deletePostHandler, updatePostHandler } from "./post.controller";
import { auth } from "../../middlewares/auth";
async function postRoutes(fastify: FastifyInstance) {
  fastify.get('/posts', { preHandler: [auth] }, getAllPostsHandler);
  fastify.post('/posts', { preHandler: [auth] }, createPostHandler);
  fastify.delete('/posts/:id', { preHandler: [auth] }, deletePostHandler);
  fastify.patch('/posts/:id', { preHandler: [auth] }, updatePostHandler);
}

export default postRoutes;