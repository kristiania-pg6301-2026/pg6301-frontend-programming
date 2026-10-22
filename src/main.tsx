import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";

import "./application.css";

function FrontPage() {
  return (
    <>
      <h1>Front Page</h1>

      <nav>
        <Link to={"/profile"}>Profile</Link>
      </nav>
    </>
  );
}

function ProfilePage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>();
  const [profile, setProfile] = useState();
  async function loadProfile() {
    const res = await fetch("/api/userinfo");
    if (res.ok) {
      setProfile(await res.json());
    } else if (res.status === 401) {
      navigate("/login");
    } else {
      setError(`Error loading ${res.url}: ${res.status} ${res.statusText}`);
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);
  return (
    <>
      <h1>Your profile</h1>
      {error && <div className={"error"}>{error}</div>}
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </>
  );
}

function LoginPage() {
  return (
    <>
      <h1>Log in</h1>
      <a href={"/api/login/google/start"}>Log in with Google</a>
    </>
  );
}

function Application() {
  return (
    <Routes>
      <Route path={"/"} element={<FrontPage />} />
      <Route path={"/profile"} element={<ProfilePage />} />
      <Route path={"/login"} element={<LoginPage />} />
      <Route path={"*"} element={<h1>Not Found</h1>} />
    </Routes>
  );
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>,
);
