import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.js";
import { ThemeProvider } from "./ThemeContext";
import { IntegrationAppProvider } from "@integration-app/react";
import jwt from "jsonwebtoken";

const WORKSPACE_KEY = import.meta.env.VITE_WORKSPACE_KEY;
const WORKSPACE_SECRET = import.meta.env.VITE_WORKSPACE_SECRET;

const TOKEN_DATA_ID = import.meta.env.VITE_TOKEN_DATA_ID;
const TOKEN_DATA_NAME = import.meta.env.VITE_TOKEN_DATA_NAME;

const tokenData = {
  id: TOKEN_DATA_ID,
  name: TOKEN_DATA_NAME,
};

const options = {
  issuer: WORKSPACE_KEY,
  expiresIn: 7200,
  algorithm: "HS512" as jwt.Algorithm,
};

const token = jwt.sign(tokenData, WORKSPACE_SECRET, options);

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <ThemeProvider>
      <IntegrationAppProvider token={token}>
        <App />
      </IntegrationAppProvider>
    </ThemeProvider>
  </StrictMode>
);
