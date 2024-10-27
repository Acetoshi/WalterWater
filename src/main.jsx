import React from "react";
import ReactDOM from "react-dom/client";
import router from "./Router.jsx";
import { RouterProvider} from "react-router-dom";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
