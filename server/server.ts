import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { setCookie } from "hono/cookie";

const app = new Hono();
// `serveStatic` makes Hono serve the output from `vite build`
app.use("*", serveStatic({ root: "../dist" }));

serve({ fetch: app.fetch, port: 8080 });

const client_configuration = {
  client_id:
    "34816606807-c2lql016g0opseg5kcccr2k6id4rplpo.apps.googleusercontent.com",
  client_secret: process.env.GOOGLE_CLIENT_SECRET!,
};

app.get("/api/userinfo", (c) => {
  return c.json({ error: "User is not logged in" }, 401);
});

async function fetchJSON(url: string) {
  const res = await fetch(url);
  return await res.json();
}

app.get("/api/login/:idProvider/complete", async (c) => {
  const { code } = c.req.query();
  if (!code) return c.json(c.req.query());

  const { token_endpoint } = await fetchJSON(
    "https://accounts.google.com/.well-known/openid-configuration",
  );
  const { client_id, client_secret } = client_configuration;
  const res = await fetch(token_endpoint, {
    method: "POST",
    body: new URLSearchParams({
      code,
      grant_type: "authorization_code",
      client_id,
      client_secret,
      redirect_uri: redirectUri(c.req.url),
    }),
  });

  const result = await res.json();
  const { access_token } = result;
  if (access_token) setCookie(c, "pg6301_token", access_token);
  return c.json(result);
});

function redirectUri(base: string) {
  return new URL("/api/login/google/complete", base).toString();
}

app.get("/api/login/:idProvider/start", async (c) => {
  const { idProvider } = c.req.param();

  const { authorization_endpoint } = await fetchJSON(
    "https://accounts.google.com/.well-known/openid-configuration",
  );

  const { client_id } = client_configuration;

  return c.redirect(
    authorization_endpoint +
      "?" +
      new URLSearchParams({
        response_type: "code",
        scope: "openid",
        redirect_uri: redirectUri(c.req.url),
        client_id,
      }),
  );
});
