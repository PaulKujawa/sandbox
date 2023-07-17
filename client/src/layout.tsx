import { Box, List, ListItemButton, ListItemText } from "@mui/material";
import { useMatches, useNavigate } from "react-router-dom";
import React from "react";
import { Outlet } from "react-router-dom";
import { Typography } from "@mui/material";
import { NavElements } from "router";

export default () => {
  const navigate = useNavigate();
  const matches = useMatches();

  const match = matches.slice(-1)[0];

  return (
    <Box
      sx={{
        height: "100vh",
        maxWidth: "96rem", // XL
        borderRight: {
          xs: "none",
          xl: 1,
        },
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          lg: "auto 1fr",
        },
        gridTemplateRows: {
          xs: "auto 1fr auto",
          lg: "auto 1fr",
        },
        gridTemplateAreas: {
          xs: `"header" "main" "footer"`,
          lg: `"header header" "nav main"`,
        },
      }}
    >
      <Box
        component="header"
        sx={{
          gridArea: "header",
          p: 1,
          color: "primary.dark",
          borderBottom: 1,
          borderColor: "text.primary",
        }}
      >
        <Typography component="div" variant="h5">
          Sandbox
        </Typography>
      </Box>

      <Box
        component="nav"
        sx={{
          gridArea: "nav",
          display: { xs: "none", lg: "block" },
          width: "15rem", // just looks better with a wider nav.
          borderRight: 1,
        }}
      >
        <List>
          {NavElements.map((route) => (
            <ListItemButton
              selected={route.id === match.id}
              onClick={() => navigate(route.pathname)}
              key={route.id}
            >
              <ListItemText primary={route.label} />
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Box
        component="main"
        sx={{
          gridArea: "main",
          overflowY: "hidden",
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Outlet />
        </Box>
      </Box>

      <Box
        component="footer"
        sx={{ gridArea: "footer", borderTop: 1, display: { lg: "none" }, p: 1 }}
      >
        footer
      </Box>
    </Box>
  );
};
