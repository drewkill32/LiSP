import { createBrowserRouter } from "react-router-dom";
import App from "../pages/App";
import { GoogleMapPage } from "../pages/GoogleMapPage";

export const createRoutes = () =>
  createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/map",
      element: <GoogleMapPage />,
      children: [
        {
          path: ":mapId",
          element: <GoogleMapPage />,
        },
      ],
    },
  ]);
