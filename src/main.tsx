import React from "react";
import { createRoot } from "react-dom/client";
import { MovieApplication } from "./setMovies.js";

createRoot(document.getElementById("root")!).render(<MovieApplication />);
