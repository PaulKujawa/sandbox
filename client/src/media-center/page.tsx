import { Box, Button } from "@mui/material";
import React from "react";

/*
 * could be later enhanced with progressive loading (LQIP)
 * and perhaps a gallery and lazy loading (IntersectionObserver)
 */
export default () => {
  const [isImageVisible, setImageVisibility] = React.useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Box
        sx={{
          aspectRatio: "3/2",
          bgcolor: "grey.200",
          marginY: "2rem",
          width: "40%",
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
        Load Image
      </Button>
    </Box>
  );
};
