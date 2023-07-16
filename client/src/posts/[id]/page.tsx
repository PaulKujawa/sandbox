import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { GetPostQuery } from "./repositories";

interface Params {
  id: string;
}

export default ({ id }: Params) => {
  const { data } = useQuery(GetPostQuery(id));
  const post = data!; // react-query lacks full suspense TS support

  return (
    <Box m={1}>
      <Typography variant="h5">{post.title}</Typography>
      <Typography color="text.secondary" variant="body2">
        Body: {post.body}
      </Typography>
    </Box>
  );
};
