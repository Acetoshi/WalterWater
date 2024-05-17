import React from "react";
import ReactDOM from "react-dom/client";
import router from "./components/Router.jsx";
import { Outlet, RouterProvider } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <Outlet />
    </RouterProvider>
  </React.StrictMode>,
);
