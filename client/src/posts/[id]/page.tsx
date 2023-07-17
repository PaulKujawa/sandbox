import { Divider, Typography } from "@mui/material";
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
    <>
      <Typography variant="body1">{post.title}</Typography>
      <Divider sx={{ my: 1 }} />
      <Typography variant="body2" color="text.secondary">
        {post.body}
      </Typography>
    </>
  );
};
