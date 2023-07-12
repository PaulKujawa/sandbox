import { Box, Button } from "@mui/material";
import React from "react";

/*
 * could be later enhanced with progressive loading (LQIP)
 * and perhaps a gallery and lazy loading (IntersectionObserver)
 */
export const Download = () => {
  const [isImageVisible, setImageVisibility] = React.useState(false);

  return (
    <Box
      sx={{
        height: "100%",
        py: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          height: "300px",
          aspectRatio: "3/2",
          bgcolor: "grey.200",
          mb: 2,
        }}
      >
        {isImageVisible && (
          <img
            style={{ height: "100%", width: "100%" }}
            src="https://picsum.photos/id/116/3504/2336"
          />
        )}
      </Box>
      <Button
        variant="outlined"
        color="primary"
        disabled={isImageVisible}
        onClick={() => setImageVisibility(!isImageVisible)}
      >
        download large image
      </Button>
    </Box>
  );
};
