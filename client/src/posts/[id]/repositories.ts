import { HttpService } from "../../lib";
import { mapPostDto, PostDto } from "../models";

export const GetPostQuery = (id: string) => ({
  queryKey: ["posts", id],
  queryFn: async () => {
    const dto = await HttpService.get<PostDto>(
      `http://localhost:8080/posts/${id}`
    );

    return mapPostDto(dto);
  },
});
