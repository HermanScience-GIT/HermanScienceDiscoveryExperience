import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DiscoveryExperience } from "../app/DiscoveryExperience";
import "../app/globals.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Unable to find the application root.");
}

createRoot(root).render(
  <StrictMode>
    <DiscoveryExperience />
  </StrictMode>,
);
