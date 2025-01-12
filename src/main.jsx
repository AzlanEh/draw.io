import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import DrawingProvider from "./context/Context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DrawingProvider>
      <App />
    </DrawingProvider>
  </StrictMode>
);
