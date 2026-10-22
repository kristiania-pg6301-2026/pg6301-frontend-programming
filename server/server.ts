import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import type { Userinfo } from "../src/userinfo.js";

const app = new Hono();
// `serveStatic` makes Hono serve the output from `vite build`
app.use("*", serveStatic({ root: "../dist" }));

serve({ fetch: app.fetch, port: 8080 });

app.get("/api/userinfo", (c) => {
  return c.json({ error: "User is not logged in" }, 401);
});

async function fetchJSON(url: string) {
  const res = await fetch(url);
  return await res.json();
}

app.get("/api/login/:idProvider/start", async (c) => {
  const { idProvider } = c.req.param();

  const discoveryDoc = await fetchJSON(
    "https://accounts.google.com/.well-known/openid-configuration",
  );
  const { authorization_endpoint } = discoveryDoc;

  return c.redirect(
    authorization_endpoint +
      "?" +
      new URLSearchParams({
        response_type: "code",
        scope: "openid",
        redirect_uri: "http://localhost:5173/api/login/google/complete",
        client_id:
          "34816606807-c2lql016g0opseg5kcccr2k6id4rplpo.apps.googleusercontent.com",
      }),
  );
});
