import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";

/**
 * StrictMode: warns against bad patterns, deprecated APIs, catches issues
 * createRoot: enables react apps to attach to HTML elements
 * BrowserRouter: enables routing between pages
 */

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
