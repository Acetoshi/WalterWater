import React from "react";
import ReactDOM from "react-dom/client";
import router from "./components/Router.jsx";
import { RouterProvider} from "react-router-dom";
import "./assets/icomoon/style.css";
import "./styles/global.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
