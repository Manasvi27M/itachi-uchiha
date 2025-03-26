import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import NavBar from "./components/shared/NavBar.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NavBar />
    <App />
  </StrictMode>
);
