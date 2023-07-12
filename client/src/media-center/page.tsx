import { Box, Divider } from "@mui/material";
import React from "react";
import { Download, Upload } from "./components";

export default () => {
  return (
    <>
      <Box sx={{ flexGrow: 0, flexShrink: 0, flexBasis: "50%" }}>
        <Download />
      </Box>

      <Divider />

      <Box sx={{ flexGrow: 0, flexShrink: 0, flexBasis: "50%" }}>
        <Upload />
      </Box>
    </>
  );
};
