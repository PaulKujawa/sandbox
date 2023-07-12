import { HttpService } from "../../lib";
import { Post } from "../models";

export const GetPostQuery = (id: string) => ({
  queryKey: ["posts", id],
  queryFn: () =>
    HttpService.get<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`),
});
