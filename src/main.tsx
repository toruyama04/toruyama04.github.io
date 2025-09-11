import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

/**
 * StrictMode: warns against bad patterns, deprecated APIs, catches issues
 * createRoot: enables react apps to attach to HTML elements
 */

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
