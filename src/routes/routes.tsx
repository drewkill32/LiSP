import { createHashRouter } from "react-router-dom";
import App from "../pages/App";
import { Map } from "../pages/Map";

export const createRoutes = () =>
  createHashRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/map",
      element: <Map />,
      children: [
        {
          path: ":mapId",
          element: <Map />,
        },
      ],
    },
  ]);
