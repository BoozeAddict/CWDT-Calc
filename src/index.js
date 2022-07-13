import React from "react";
import ReactDOM from "react-dom/client";
import "./Styles/index.css";
import "./Styles/App.scss";
import "./Styles/Container.scss";
import App from "./App";
import { StatsProvider } from "./Context/StatsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StatsProvider>
      <App />
    </StatsProvider>
  </React.StrictMode>
);
