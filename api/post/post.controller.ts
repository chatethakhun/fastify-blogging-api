import { FastifyReply, FastifyRequest } from "fastify";
import { getAllPosts, createPost, updatePost, deletePost } from "./post.service"
import { CreatePostInput } from "./post.schema";
import { throwErrorMessage } from "../../utils/errorResponse";

export async function getAllPostsHandler(request: FastifyRequest, reply: FastifyReply) {
  const posts = await getAllPosts()
  return reply.send(posts).status(200)
}

export async function createPostHandler(request: { body: CreatePostInput } & FastifyRequest
  , reply: FastifyReply) {
  try {
    const payload: TokenPayload = await request.jwtVerify()
    const post = await createPost({
      ...request.body,
      userId: payload.id
    })
    return post
  } catch (error: any) {
    throwErrorMessage(error.code, reply)
  }

}

export async function deletePostHandler(request: FastifyRequest<{
  Params: {
    id: string;
  }
}>, reply: FastifyReply) {
  const { id } = request.params

  try {
    await deletePost(id)
    return reply.send(200)
  } catch (error: ErrorCode | any) {
    throwErrorMessage(error.code, reply)
  }

}

export async function updatePostHandler(request: FastifyRequest<{
  Body: CreatePostInput;
  Params: {
    id: string;
  }
}>, reply: FastifyReply) {
  const { id } = request.params
  try {
    const post = await updatePost(id, request.body)
    return post
  } catch (error: ErrorCode | any) {
    throwErrorMessage(error.code, reply)
  }

}