import React from "react";
import { createRoot } from "react-dom/client";

function MovieApplication() {
  return (
    <>
      <h1>Movies</h1>
    </>
  );
}

createRoot(document.getElementById("root")!).render(<MovieApplication />);
