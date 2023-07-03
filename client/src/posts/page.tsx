import { Box, Divider, TextField, Typography } from "@mui/material";
import React, { Suspense } from "react";
import Post from "./[id]/page";
import { PostPlaceholder } from "./[id]/components";
import { Posts, PostsPlaceholder } from "./components";

export default () => {
  const [selectedPost, selectPost] = React.useState<string | undefined>();
  const [query, setQuery] = React.useState("");
  const deferredQuery = React.useDeferredValue(query);

  return (
    <Box sx={{ display: "flex", height: "100%", width: "100%", py: 1 }}>
      <Box flexBasis="50%">
        <Box sx={{ ml: 2, pb: 2 }}>
          <Typography variant="h4" component="h1">
            Posts
          </Typography>

          <TextField
            variant="standard"
            label="Search by title"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Box>
        <Divider />

        <Suspense fallback={<PostsPlaceholder />}>
          <Posts
            query={deferredQuery}
            selectedPost={selectedPost}
            onSelect={selectPost}
          />
        </Suspense>
      </Box>

      <Box
        sx={{
          flexBasis: "50%",
          borderLeft: 1,
          borderColor: "grey.500",
        }}
      >
        {selectedPost && (
          <Suspense fallback={<PostPlaceholder />}>
            <Post id={selectedPost} />
          </Suspense>
        )}
      </Box>
    </Box>
  );
};
