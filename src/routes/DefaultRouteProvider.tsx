import { RouterProvider } from "react-router-dom";

import { createRoutes } from "./routes";

export const DefaultRouteProvider = () => {
  return <RouterProvider router={createRoutes()} />;
};
