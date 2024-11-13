import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./Router.jsx";
import PositionProvider from "./Contexts/PositionProvider";
import PointsOfInterestProvider from "./Contexts/PointsOfInterestProvider";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PositionProvider>
      <PointsOfInterestProvider>
        <RouterProvider router={router} />
      </PointsOfInterestProvider>
    </PositionProvider>
  </React.StrictMode>
);
