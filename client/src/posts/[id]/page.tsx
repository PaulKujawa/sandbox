import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { PostQuery } from "./repositories";

interface Params {
  id: string;
}

export default ({ id }: Params) => {
  const { data } = useQuery(PostQuery(id));
  const post = data!; // react-query lacks full suspense TS support

  return (
    <Box m={1}>
      <Typography variant="h5">Todo {post.id}</Typography>
      <Typography variant="body1">Title: {post.title}</Typography>
      <Typography color="text.secondary" variant="body2">
        Body: {post.body}
      </Typography>
    </Box>
  );
};
