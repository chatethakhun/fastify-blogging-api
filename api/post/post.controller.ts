import { FastifyRequest } from "fastify";
import { getAllPosts, createPost } from "./post.service"
import { CreatePostInput } from "./post.schema";

export async function getAllPostsHandler() {
  const posts = await getAllPosts()
  return posts
}

export async function createPostHandler(request: FastifyRequest<{
  Body: CreatePostInput;
}>
) {
  const post = await createPost({
    ...request.body,
  })
  return post
}