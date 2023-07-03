import { List, ListItemButton, ListItemText } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { PostsQuery } from "../repositories";

interface Props {
  query: string;
  selectedPost?: string;
  onSelect: (id: string) => void;
}

export const Posts = ({ query, selectedPost, onSelect }: Props) => {
  const { data } = useQuery(PostsQuery());
  const posts = data!; // react-query lacks full suspense TS support

  React.useEffect(() => {
    if (posts?.length) {
      onSelect(posts[0].id);
    }
  }, [posts]);

  return (
    <List sx={{ flexBasis: "50%" }}>
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
  );
};
