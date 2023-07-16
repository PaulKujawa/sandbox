import { Box, Divider, TextField, Typography } from "@mui/material";
import React, { Suspense } from "react";
import Post from "./[id]/page";
import { PostPlaceholder } from "./[id]/components";
import { Posts, PostsPlaceholder } from "./components";

export default () => {
  const [selectedPostId, selectPostId] = React.useState<string>();
  const [query, setQuery] = React.useState("");
  const deferredQuery = React.useDeferredValue(query);

  return (
    <>
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

      <Box
        sx={{
          flexGrow: 1,
          py: 1,
          overflowY: "auto",
          display: "flex",
        }}
      >
        <Box flexBasis="50%" sx={{ overflowY: "auto" }}>
          <Suspense fallback={<PostsPlaceholder />}>
            <Posts
              query={deferredQuery}
              selectedPost={selectedPostId}
              onSelect={selectPostId}
            />
          </Suspense>
        </Box>

        <Box flexBasis="50%">
          {selectedPostId && (
            <Suspense fallback={<PostPlaceholder />}>
              <Post id={selectedPostId} />
            </Suspense>
          )}
        </Box>
      </Box>
    </>
  );
};
