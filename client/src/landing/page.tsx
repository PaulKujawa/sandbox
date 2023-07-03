import { Box } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

// bigger apps should be cautious with cross-module imports
// some ESLint rule and module export buckets could be an approach.
import { PostsQuery } from "../posts/repositories";

export default () => {
  const queryClient = useQueryClient();

  React.useEffect(() => {
    queryClient.prefetchQuery(PostsQuery());
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      landing page
    </Box>
  );
};
