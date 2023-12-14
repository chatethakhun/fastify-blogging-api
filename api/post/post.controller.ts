import { FastifyReply, FastifyRequest } from "fastify";
import { getAllPosts, createPost } from "./post.service"
import { CreatePostInput } from "./post.schema";

export async function getAllPostsHandler(request: FastifyRequest, reply: FastifyReply){
  const posts = await getAllPosts()
  return reply.send(posts).status(200)
}

export async function createPostHandler(request: FastifyRequest<{
  Body: CreatePostInput;
}>
) {
  const payload: TokenPayload = await request.jwtVerify()
  const post = await createPost({
    ...request.body,
    userId: payload.id
  })
  return post
}