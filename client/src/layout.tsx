// import { List, ListItemButton, ListItemText } from "@mui/material";
// import { useMatches, useNavigate } from "react-router-dom";
import React, { createContext, Suspense, useContext, useState } from "react";
// import { Outlet } from "react-router-dom";
// import "./layout.css";
// import { Typography } from "@mui/material";
// import { NavElements } from "./router";

export default () => {
  // const navigate = useNavigate();
  // const matches = useMatches();

  // const match = matches.slice(-1)[0];

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>sandbox</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </head>

      <body>
        <div style={styles.root}>
          <div style={styles.header}>
            {/* <Typography component="div" variant="h5"> */}
            Sandbox
            {/* </Typography> */}
          </div>

          <div style={styles.aside}>
            {/* 
            <List>
              {NavElements.map((route) => (
                <div key={route.id}>{route.label}</div>
                <ListItemButton
                  selected={route.id === match.id}
                  onClick={() => navigate(route.pathname)}
                  key={route.id}
                >
                <ListItemText primary={route.label} />
                </ListItemButton>
              ))}
            </List>  
          */}
          </div>

          <div style={styles.main}>
            {/* <Outlet /> */}
            <Suspense fallback="spinner">
              <Foo />
            </Suspense>
            demo page
          </div>

          <div style={styles.footer}>some footer</div>
        </div>
      </body>
    </html>
  );
};

const DataConext = createContext(null);

const Foo = () => {
  // const [s] = useState(124);
  const ctx = useContext(DataConext);

  return <span>child</span>;
};

// TODO use at least CSS classes if not CSS-In-JS,
// also because media queries can't be inlined.
const styles = {
  root: {
    height: "100vh",
    display: "grid",
    gridTemplateColumns: "12rem 1fr 3rem",
    gridTemplateRows: "auto 1fr 3rem",
    gridTemplateAreas: `"header header header"
      "sidebar main main"
      "footer footer footer"`,
    gridGap: "1em",
  },
  header: {
    gridArea: "header",
    border: "1px lightgrey solid",
  },
  aside: {
    gridArea: "sidebar",
    display: "block",
    border: "1px lightgrey solid",
  },
  main: {
    gridArea: "main",
    height: "100%",
    border: "1px lightgrey solid",
  },
  footer: {
    gridArea: "footer",
    border: "1px lightgrey solid",
  },
};
