import { createBrowserRouter, Outlet } from "react-router-dom";
import Map from "./pages/Map";
import App from "./App";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import GetTheApp from "./pages/getTheApp";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    errorElement: <h1>404 not found</h1>,
    children: [
      {
        path: "",
        element: <Map />,
      },
      {
        path: "get-the-app",
        element: <GetTheApp />,
      },
      {
        path: "/about",
        element: <Outlet />, // Use <Outlet /> as a component
        children: [
          {
            path: "support",
            element: <h1>this is the about page</h1>,
          },
          {
            path: "privacy",
            element: <PrivacyPolicy />,
          },
        ],
      },
    ],
  },
]);

export default router;
