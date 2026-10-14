import React from "react";
import { createRoot } from "react-dom/client";
import { TodoApplication } from "./todoApplication.js";

createRoot(document.getElementById("root")!).render(<TodoApplication />);
