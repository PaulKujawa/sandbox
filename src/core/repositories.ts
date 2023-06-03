import { Post } from "./entities";
import { HttpClient } from "./lib";

export const PostQuery = (id: string) => ({
  queryKey: ["posts", id],
  queryFn: () =>
    HttpClient.get<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`),
});

export const PostsQuery = () => ({
  queryKey: ["posts"],
  queryFn: () =>
    HttpClient.get<Post[]>(`https://jsonplaceholder.typicode.com/posts`),
});
