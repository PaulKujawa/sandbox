import React from "react";
import { Outlet } from "react-router-dom";
import { Aside, Header } from "../components";
import "./Layout.css";

export const Layout = () => {
  return (
    <div className="root">
      <header>
        <Header />
      </header>

      <aside>
        <Aside />
      </aside>

      <main>
        <Outlet />
      </main>

      <footer>some footer</footer>
    </div>
  );
};
