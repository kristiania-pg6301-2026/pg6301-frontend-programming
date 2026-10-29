import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";

const app = new Hono();
// `serveStatic` makes Hono serve the output from `vite build`
app.use("*", serveStatic({ root: "../dist" }));

serve({ fetch: app.fetch, port: 8080 });

const idProviders: Record<
  string,
  { client_id: string; client_secret: string; discovery_endpoint: string }
> = {
  google: {
    client_id:
      "34816606807-c2lql016g0opseg5kcccr2k6id4rplpo.apps.googleusercontent.com",
    client_secret: process.env.GOOGLE_CLIENT_SECRET!,
    discovery_endpoint:
      "https://accounts.google.com/.well-known/openid-configuration",
  },
  linkedin: {
    client_id: "78qfeot6hy7yol",
    client_secret: process.env.LINKEDIN_CLIENT_SECRET!,
    discovery_endpoint:
      "https://www.linkedin.com/oauth/.well-known/openid-configuration",
  },
};

app.get("/api/login/:idProvider/start", async (c) => {
  const { idProvider } = c.req.param();
  const config = idProviders[idProvider]!;

  const { client_id, discovery_endpoint } = config;
  const { authorization_endpoint } = await fetchJSON(discovery_endpoint);

  const params = {
    response_type: "code",
    scope: "openid profile email",
    redirect_uri: redirectUri(`/api/login/${idProvider}/complete`, c.req.url),
    client_id,
  };
  return c.redirect(`${authorization_endpoint}?${new URLSearchParams(params)}`);
});

app.get("/api/login/:idProvider/complete", async (c) => {
  const { code } = c.req.query();
  if (!code) return c.json(c.req.query());

  const { idProvider } = c.req.param();
  const config = idProviders[idProvider]!;

  const { discovery_endpoint, client_id, client_secret } = config;
  const { token_endpoint } = await fetchJSON(discovery_endpoint);

  const params = {
    grant_type: "authorization_code",
    code,
    client_id,
    client_secret,
    redirect_uri: redirectUri(`/api/login/${idProvider}/complete`, c.req.url),
  };
  const res = await fetch(token_endpoint, {
    method: "POST",
    body: new URLSearchParams(params),
  });

  const result = await res.json();
  if (!res.ok) {
    return c.json(result);
  }
  const { access_token } = result;
  if (access_token) setCookie(c, `${idProvider}_token`, access_token);
  return c.redirect("/profile");
});

app.get("/api/userinfo", async (c) => {
  const idProvider = Object.keys(idProviders).find((i) =>
    getCookie(c, `${i}_token`),
  );
  if (!idProvider) return c.json({ error: "User is not logged in" }, 401);
  const access_token = getCookie(c, `${idProvider}_token`);
  if (!access_token) return c.json({ error: "User is not logged in" }, 401);

  const config = idProviders[idProvider]!;
  const { discovery_endpoint } = config;

  const { userinfo_endpoint } = await fetchJSON(discovery_endpoint);
  return c.json(
    await fetchJSON(userinfo_endpoint, {
      headers: { Authorization: `Bearer ${access_token}` },
    }),
  );
});

app.get("/api/login/end_session", (c) => {
  Object.keys(idProviders).forEach((i) => deleteCookie(c, `${i}_token`));
  return c.redirect("/");
});

async function fetchJSON(url: string, init?: RequestInit) {
  const res = await fetch(url, init);
  return await res.json();
}

function redirectUri(url: string, base: string) {
  if (base.startsWith("http://") && !base.startsWith("http://localhost")) {
    base = base.replace("http://", "https://");
  }
  return new URL(url, base).toString();
}
