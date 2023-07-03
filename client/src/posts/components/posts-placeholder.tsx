import { Skeleton } from "@mui/material";
import React from "react";

export const PostsPlaceholder = () => (
  <>
    {new Array(5).fill(null).map((_, i) => (
      <Skeleton variant="text" sx={{ fontSize: "3rem" }} key={i} />
    ))}
  </>
);
