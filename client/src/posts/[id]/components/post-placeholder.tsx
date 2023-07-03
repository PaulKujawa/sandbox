import { Skeleton, Typography } from "@mui/material";
import React from "react";

export const PostPlaceholder = () => (
  <>
    <Typography variant="h5" component="div">
      <Skeleton />
    </Typography>
    <Typography variant="body1" component="div">
      <Skeleton />
    </Typography>
    <Typography variant="body2" component="div">
      <Skeleton />
    </Typography>
  </>
);
