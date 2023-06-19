import * as React from "react";
import {createRoot} from "react-dom/client";
import "src/index.css";
import {App} from "src/App";

const domNode = document.getElementById("root") as Element;
const root = createRoot(domNode);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
