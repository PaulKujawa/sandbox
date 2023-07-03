import { HttpService } from "../lib";
import { Post } from "./models";

export const PostsQuery = () => ({
  queryKey: ["posts"],
  queryFn: () =>
    HttpService.get<Post[]>(`https://jsonplaceholder.typicode.com/posts`),
});
