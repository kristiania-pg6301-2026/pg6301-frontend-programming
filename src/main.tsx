import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import type { Userinfo } from "./userinfo.js";

function ProfilePage() {
  const [userinfo, setUserinfo] = useState<Userinfo>();

  async function loadUserinfo() {
    const res = await fetch("/api/userinfo");
    setUserinfo(await res.json());
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

createRoot(document.getElementById("root")!).render(<ProfilePage />);
