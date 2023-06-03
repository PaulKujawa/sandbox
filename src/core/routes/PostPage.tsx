import { Box, Card, CardContent, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { PostQuery } from "core/repositories";
import React from "react";
import { useParams } from "react-router-dom";

export const PostPage = () => {
  const params = useParams();
  const { data } = useQuery(PostQuery(params.postId!));

  if (!data) return null;

  return (
    <Box
      height={"100%"}
      display={"flex"}
      alignItems="center"
      justifyContent="center"
    >
      <Card sx={{ maxWidth: "21rem" }}>
        <CardContent>
          <Typography component="h2" variant="h4">
            {data.title}
          </Typography>
          <Typography color="text.secondary" variant="body1">
            {data.body}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
