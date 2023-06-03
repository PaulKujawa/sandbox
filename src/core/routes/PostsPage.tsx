import { List, ListItemButton, ListItemText } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { PostsQuery } from "core/repositories";
import React from "react";
import { useNavigate } from "react-router-dom";

export const PostsPage = () => {
  const navigate = useNavigate();
  const { data } = useQuery(PostsQuery());

  if (!data) return null;

  return (
    <List>
      {data.map((post) => (
        <ListItemButton
          onClick={() => navigate(`/posts/${post.id}`)}
          key={post.id}
        >
          <ListItemText primary={post.title} />
        </ListItemButton>
      ))}
    </List>
  );
};
