import { createBrowserRouter } from "react-router-dom";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>404 not found</h1>,
  },
  {
    path: "/info",
    element: <h1>Lucas, fous ton composant ici</h1>,
  },
]);

export default router;