import { Box, TextField, Typography } from "@mui/material";
import React, { Suspense } from "react";
import { Posts, PostsPlaceholder } from "./components";
import { PostPlaceholder } from "./[id]/components";
import Post from "./[id]/page";

export default () => {
  const [selectedPostId, selectPostId] = React.useState<string>();
  const [query, setQuery] = React.useState("");
  const deferredQuery = React.useDeferredValue(query);

  return (
    <>
      <Box sx={{ pb: 2 }}>
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

      <Box
        sx={{
          flexGrow: 1,
          py: 1,
          overflowY: "auto",
          display: "flex",
        }}
      >
        <Box flexBasis="50%" sx={{ overflowY: "auto", pr: 2, borderRight: 1 }}>
          <Suspense fallback={<PostsPlaceholder />}>
            <Posts
              query={deferredQuery}
              selectedPost={selectedPostId}
              onSelect={selectPostId}
            />
          </Suspense>
        </Box>

        <Box sx={{ flexBasis: "50%", pl: 2 }}>
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
