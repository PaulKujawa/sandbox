import { Box } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

// bigger apps should be cautious with cross-module imports
// some ESLint rule and module export buckets could be an approach.
import { GetPostsQuery } from "../posts/repositories";

export default () => {
  const queryClient = useQueryClient();

  React.useEffect(() => {
    queryClient.prefetchInfiniteQuery(GetPostsQuery());
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
      }}
    >
      landing page
    </Box>
  );
};
