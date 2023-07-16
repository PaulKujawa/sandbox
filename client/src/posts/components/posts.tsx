import { List, ListItemButton, ListItemText } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { GetPostsQuery } from "../repositories";
import { InfiniteScroll } from "./infiniteScroll";

interface Props {
  query: string;
  selectedPost?: string;
  onSelect: (id: string) => void;
}

export const Posts = ({ query, selectedPost, onSelect }: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    GetPostsQuery()
  );

  // if I didn't know BE only holds 100 posts, useMemo would be wise.
  // also, react-query lacks full suspense TS support
  const posts = data!.pages.flatMap((page) => page.items);

  React.useEffect(() => {
    if (posts.length) {
      onSelect(posts[0].id);
    }
  }, [data]);

  return (
    <InfiniteScroll
      canFetchMore={!!hasNextPage}
      isFetching={isFetching}
      fetchMore={fetchNextPage}
    >
      <List sx={{ minHeight: "100%", borderRight: 1 }}>
        {posts
          .filter((post) => post.title.includes(query))
          .map((post) => (
            <ListItemButton
              selected={post.id === selectedPost}
              onClick={() => onSelect(post.id)}
              key={post.id}
            >
              <ListItemText primary={post.title} />
            </ListItemButton>
          ))}
      </List>
    </InfiniteScroll>
  );
};
