import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import ReactGA from "react-ga";
import { LineupProvider } from "./lineup";
import { DefaultRouteProvider } from "./routes";
import { DefaultThemeProvider } from "./theme/DefaultThemeProvider";

ReactGA.initialize(import.meta.env.VITE_GOOGLE_ANALYTICS_ID);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60, // 1 hour
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <DefaultThemeProvider>
        <LineupProvider>
          <DefaultRouteProvider />
        </LineupProvider>
      </DefaultThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
    </QueryClientProvider>
  </React.StrictMode>
);
