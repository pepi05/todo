import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TodoProvider } from "./context/todoContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <TodoProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TodoProvider>
);
