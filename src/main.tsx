import React from "react";
import { createRoot } from "react-dom/client";

function Application() {
  return <h1>My tasks</h1>;
}

createRoot(document.getElementById("app")!).render(<Application />);
