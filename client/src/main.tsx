import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { HelmetProvider } from "react-helmet-async";

import { ConfigProvider } from "./context/ConfigContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <ConfigProvider>
        <App />
      </ConfigProvider>
    </HelmetProvider>
  </StrictMode>,
);
