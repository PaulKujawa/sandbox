import { HttpService } from "../lib";
import {
  mapPaginatedDto,
  mapPostDto,
  Paginated,
  Post,
  PostDto,
} from "./models";

export const GetPostsQuery = () => ({
  queryKey: ["posts"],
  queryFn: async ({ pageParam }: { pageParam?: number }) => {
    const query = pageParam ? `?cursor=${pageParam}` : "";

    const paginatedDto = await HttpService.get<Paginated<PostDto>>(
      `http://localhost:8080/posts${query}`
    );

    return mapPaginatedDto(mapPostDto)(paginatedDto);
  },
  getNextPageParam: (curr: Paginated<Post>) => curr.cursorNext,
});
