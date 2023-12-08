import { Box } from "@mui/material";
import React from "react";
import { FileGrid, FileUpload } from "./components";

export default () => {
  return (
    <>
      {/* flexGrow: 0, flexShrink: 0, flexBasis: "50%", */}
      <Box sx={{ mb: 4, mx: { xs: 0, sm: "10%", md: "20%", lg: "25%" } }}>
        <FileUpload />
      </Box>

      {/* flexGrow: 1, flexShrink: 0, flexBasis: "50%" */}
      <FileGrid />
      {/* <FileDownload /> */}
      {/* </Box> */}
    </>
  );
};
