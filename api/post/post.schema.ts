import { z } from 'zod'
import { buildJsonSchemas  } from 'fastify-zod'

const postInput = {
  title: z.string(),
  content: z.string(),
}

const postAutoGenerated = {
  id: z.number(),
  createdAt: z.date()
}

const createPostSchema = z.object({
  ...postInput
})

const postResponseSchema = z.object({
  ...postAutoGenerated,
  ...postInput
})

const postsSchema = z.array(postResponseSchema)

export type CreatePostInput = z.infer<typeof createPostSchema>

export const { schemas: postSchemas, $ref } = buildJsonSchemas({
  createPostSchema,
  postResponseSchema,
  postsSchema
})