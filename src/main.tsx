import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function Application() {
  return (
    <Routes>
      <Route path={"/"} element={<h1>Front Page</h1>} />
      <Route path={"/profile"} element={<h1>Your profile</h1>} />
      <Route path={"/login"} element={<h1>Log in</h1>} />
      <Route path={"*"} element={<h1>Not Found</h1>} />
    </Routes>
  );
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>,
);
