import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import InfoPage from "../pages/InfoPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>404 not found</h1>,
  },
  {
    path: "/info",
    element: <InfoPage/>,
  },


]);

export default router;
