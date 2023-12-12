import { getAllPosts } from "./post.service"

export async function getAllPostsHandler() {
  const posts = await getAllPosts()
  return posts
}