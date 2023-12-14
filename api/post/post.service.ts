import prisma from "../../utils/prisma";
import { CreatePostInput } from "./post.schema";

export async function getAllPosts() {
  return prisma.post.findMany();
}

export async function createPost(data: CreatePostInput & { userId: number }){
  return prisma.post.create({ data })
}

export async function deletePost(id: string) {
  return prisma.post.delete({ where: { id: Number(id) } })
}

export async function updatePost(id: string, data: CreatePostInput) {
  return prisma.post.update({ where: { id: Number(id) }, data })
}