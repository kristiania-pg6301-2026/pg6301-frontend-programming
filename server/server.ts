import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";

const app = new Hono();

serve({ fetch: app.fetch, port: 8080 });

const client_configurations: Record<
  string,
  { client_id: string; client_secret: string; discovery_doc: string }
> = {
  linkedin: {
    client_id: "78ggt9z21t62rj",
    client_secret: process.env.LINKEDIN_CLIENT_SECRET!,
    discovery_doc:
      "https://www.linkedin.com/oauth/.well-known/openid-configuration",
  },
  google: {
    discovery_doc:
      "https://accounts.google.com/.well-known/openid-configuration",
    client_id:
      "34816606807-c2lql016g0opseg5kcccr2k6id4rplpo.apps.googleusercontent.com",
    client_secret: process.env.GOOGLE_CLIENT_SECRET!,
  },
};
function redirectUri(base: string, url: string) {
  return new URL(url, base).toString();
}

app.get("/api/login/:idProvider/start", async (c) => {
  const { idProvider } = c.req.param();

  const { client_id, discovery_doc } = client_configurations[idProvider]!;
  const { authorization_endpoint } = await fetchJSON(discovery_doc);

  const params = {
    response_type: "code",
    scope: "openid profile email",
    redirect_uri: redirectUri(c.req.url, `/api/login/${idProvider}/complete`),
    client_id,
  };
  return c.redirect(`${authorization_endpoint}?${new URLSearchParams(params)}`);
});

async function fetchJSON(url: string, init?: RequestInit) {
  const res = await fetch(url, init);
  return await res.json();
}

app.get("/api/login/:idProvider/complete", async (c) => {
  const { idProvider } = c.req.param();
  const { code } = c.req.query();
  if (!code) return c.json(c.req.query());

  const { client_id, client_secret, discovery_doc } =
    client_configurations[idProvider]!;
  const { token_endpoint } = await fetchJSON(discovery_doc);
  const params = {
    code,
    grant_type: "authorization_code",
    client_id,
    client_secret,
    redirect_uri: redirectUri(c.req.url, `/api/login/${idProvider}/complete`),
  };
  const result = await fetchJSON(token_endpoint, {
    method: "POST",
    body: new URLSearchParams(params),
  });
  const { access_token } = result;
  if (access_token) setCookie(c, `${idProvider}_access_token`, access_token);
  return c.redirect("/profile");
});

app.get("/api/userinfo", async (c) => {
  const idProvider = Object.keys(client_configurations).find((idp) =>
    getCookie(c, `${idp}_access_token`),
  );
  if (!idProvider) return c.json({ error: "User is not logged in" }, 401);

  const access_token = getCookie(c, `${idProvider}_access_token`);
  const { discovery_doc } = client_configurations[idProvider]!;
  const { userinfo_endpoint } = await fetchJSON(discovery_doc);
  return c.json(
    await fetchJSON(userinfo_endpoint, {
      headers: { Authorization: `Bearer ${access_token}` },
    }),
  );
});

app.get("/api/login/end_session", (c) => {
  Object.keys(client_configurations).forEach((idp) => {
    deleteCookie(c, `${idp}_access_token`);
  });
  return c.redirect("/");
});

app.use("*", serveStatic({ root: "../dist" }));
app.get("*", serveStatic({ path: "../dist/index.html" }));
