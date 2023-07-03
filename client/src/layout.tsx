import { List, ListItemButton, ListItemText } from "@mui/material";
import { useMatches, useNavigate } from "react-router-dom";
import React from "react";
import { Outlet } from "react-router-dom";
import "./layout.css";
import { Typography } from "@mui/material";
import { NavElements } from "router";

export default () => {
  const navigate = useNavigate();
  const matches = useMatches();

  const match = matches.slice(-1)[0];

  return (
    <div className="root">
      <header>
        <Typography component="div" variant="h5">
          Sandbox
        </Typography>
      </header>

      <aside>
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
      </aside>

      <main>
        <Outlet />
      </main>

      <footer>some footer</footer>
    </div>
  );
};
