import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./Router.jsx";
import PositionProvider from "./Contexts/PositionProvider.jsx";
import PointsOfInterestProvider from "./Contexts/PointsOfInterestProvider.jsx";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PositionProvider>
      <PointsOfInterestProvider>
        <RouterProvider router={router} />
      </PointsOfInterestProvider>
    </PositionProvider>
  </React.StrictMode>
);
