import prisma from "../../utils/prisma";
import { CreatePostInput } from "./post.schema";

export async function getAllPosts() {
  return prisma.post.findMany();
}

export async function createPost(data: CreatePostInput){
  return prisma.post.create({ data })
}