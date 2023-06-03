import { List, ListItemButton, ListItemText, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Aside = () => {
  const navigate = useNavigate();

  return (
    <>
      <List>
        <ListItemButton onClick={() => navigate("/")}>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/posts")}>
          <ListItemText primary="Posts" />
        </ListItemButton>
      </List>
    </>
  );
};
