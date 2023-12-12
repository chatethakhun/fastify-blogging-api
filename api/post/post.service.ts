import prisma from "../../utils/prisma";

export async function getAllPosts() {
  return await prisma.post.findMany();
}