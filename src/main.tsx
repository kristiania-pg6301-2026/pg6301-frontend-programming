import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import type { Userinfo } from "./userinfo.js";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

function ProfilePage() {
  const [userinfo, setUserinfo] = useState<Userinfo>();
  const navigate = useNavigate();

  async function loadUserinfo() {
    const res = await fetch("/api/userinfo");
    if (res.ok) {
      setUserinfo(await res.json());
    } else if (res.status === 401) {
      navigate("/login");
    }
  }

  useEffect(() => {
    loadUserinfo();
  }, []);

  return (
    <>
      <h1>Your profile</h1>
      {userinfo && <pre>{JSON.stringify(userinfo)}</pre>}
    </>
  );
}

function FrontPage() {
  return (
    <>
      <h1>Front Page</h1>
      <nav>
        <Link to={"/profile"}>My Profile</Link>
      </nav>
    </>
  );
}

function LoginPage() {
  return (
    <>
      <h1>Please Log In</h1>
      <a href={"/api/login/google/start"}>Log in with Google</a>
    </>
  );
}

function Application() {
  return (
    <Routes>
      <Route path={"/"} element={<FrontPage />} />
      <Route path={"/login"} element={<LoginPage />} />
      <Route path={"/profile"} element={<ProfilePage />} />
      <Route path={"*"} element={<h1>Not found (frontend)</h1>} />
    </Routes>
  );
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>,
);
