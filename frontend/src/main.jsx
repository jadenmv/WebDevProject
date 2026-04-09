import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { NavBar } from "./components/navigation/NavBar";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NavBar>
      <App />
    </NavBar>
  </StrictMode>,
);
