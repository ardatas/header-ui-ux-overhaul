import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
const Dashboard = React.lazy(() => import("./dashboard/Dashboard"));
import "./fonts.css";
import "./styles.css";
import { readAppearance } from "./lib/appearance";

document.documentElement.dataset.theme = readAppearance();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {window.location.pathname.replace(/\/$/, "") === "/dashboard" ? (
      <React.Suspense
        fallback={
          <div role="status" style={{ padding: 32 }}>
            Opening your workspace…
          </div>
        }
      >
        <Dashboard />
      </React.Suspense>
    ) : (
      <App />
    )}
  </React.StrictMode>,
);
