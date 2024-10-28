import React from "react";
import ReactDOM from "react-dom/client";
import router from "./Router.jsx";
import { RouterProvider } from "react-router-dom";
import "./styles/global.css";
import PositionProvider from "./Contexts/PositionProvider";
import PointsOfInterestProvider from "./Contexts/PointsOfInterestProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PositionProvider>
      <PointsOfInterestProvider>
        <RouterProvider router={router} />
      </PointsOfInterestProvider>
    </PositionProvider>
  </React.StrictMode>
);
