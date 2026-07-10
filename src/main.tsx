import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

// import App from "@/App";
import "@/index.css";
import { SignupCompletePage } from "./pages/SignupCompletePage";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element was not found.");
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <SignupCompletePage />
    </BrowserRouter>
  </StrictMode>,
);
