import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./index.css";
import { register } from "swiper/element/bundle";
import React from "react";
import ReactDOM from "react-dom/client";

// Register Swiper elements globally before rendering
register();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
