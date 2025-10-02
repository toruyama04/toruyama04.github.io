import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/HomePage.tsx";

/**
 * StrictMode: warns against bad patterns, deprecated APIs, catches issues
 * createRoot: enables react apps to attach to HTML elements
 */

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  </StrictMode>,
);
